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
    const systemPrompt = `You are a Project Manager.

Based on the project description: ${project.description}, generate a list of actionable development tasks.

Each task MUST follow this JSON structure:

{
  "title": "short task name",
  "description": "clear explanation of what needs to be done",
  "priority": "low | medium | high",
  "status": "todo"
}

Rules:
- Return ONLY a valid JSON array.
- Do NOT include explanations or text outside JSON.
- Each task should be practical and implementable by a developer.
- Priority should reflect the logical order of implementation.

Example Output:

[
  {
    "title": "Setup database",
    "description": "Configure MongoDB connection and create initial schemas for users and projects",
    "priority": "high",
    "status": "todo"
  },
  {
    "title": "Create authentication API",
    "description": "Implement user registration and login using JWT authentication",
    "priority": "high",
    "status": "todo"
  }
]`
console.log(prompt)

    const finalPrompt = prompt ===''
        ? `${systemPrompt}. Return ONLY a valid JSON array.`
        : `${prompt}.Return ONLY a valid JSON array.` 

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
            res.status(404).json({message:'Add .Return ONLY a valid JSON array in your prompt' });
        }
        res.status(200).json({tasks,projectId});

    
});