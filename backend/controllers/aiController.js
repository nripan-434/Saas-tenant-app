import { InferenceClient } from '@huggingface/inference';
import { asyncHandler } from "../middleware/asyncHandler.js";
import projectModel from '../models/projectModel.js';

const client = new InferenceClient(process.env.HF_TOKEN)

export const createAitask = asyncHandler(async (req, res) => {
    const { prompt, projectId } = req.body

    if (!projectId) {
        return res.status(400).json({ message: 'projectId required' })
    }

    const project = await projectModel.findById(projectId)
    if (!project) {
        return res.status(404).json({ message: 'Project not found' })
    }
    const systemPrompt = `You are a Project Manager. Based on the project description :${project.description}, generate a list of actionable tasks. 
    Return ONLY a valid JSON array of strings.
    Example: ["Setup database and should be structured", "Create login API and necessary logic", "Design UI"]`

    const finalPrompt = prompt ===''
        ? systemPrompt
        : `${prompt}. Project Context: ${project.description} ,Return ONLY a valid JSON array of strings` 

        const response = await client.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: finalPrompt }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });
        const resultText = response.choices[0].message.content
        let tasks;
        try {
            tasks = JSON.parse(resultText);
        } catch (e) {
            tasks = resultText; 
        }
        res.status(200).json({tasks});

    
});