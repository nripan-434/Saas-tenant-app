import { InferenceClient } from '@huggingface/inference';
import { asyncHandler } from "../middleware/asyncHandler.js";
import projectModel from '../models/projectModel.js';

const client = new InferenceClient(process.env.HF_TOKEN);

export const createAitask = asyncHandler(async (req, res) => {
    const { prompt, projectId } = req.body;

    if (!projectId) {
        return res.status(400).json({ message: 'projectId required' });
    }

    const project = await projectModel.findById(projectId);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    // This ensures the AI behaves like a project manager
    const systemPrompt = `You are a Project Manager. Based on the project description, generate a list of actionable tasks. 
    Return ONLY a valid JSON array of strings.
    Example: ["Setup database and should be structured", "Create login API and necessary logic", "Design UI"]`;

    const finalPrompt = prompt 
        ? `${prompt}. Project Context: ${project.description} ,Return ONLY a valid JSON array of strings` 
        : `Generate tasks for this project: ${project.description}`;

    try {
        const response = await client.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: finalPrompt }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });
        const resultText = response.choices[0].message.content;
        let tasks;
        try {
            tasks = JSON.parse(resultText);
        } catch (e) {
            tasks = resultText; 
        }
        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        console.error("HF Inference Error:", error);
        res.status(500).json({ message: "AI generation failed", error: error.message });
    }
});