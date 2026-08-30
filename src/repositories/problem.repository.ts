import {IProblem, Problem} from "../models/problem.model";

export interface IProblemRepository {
    createProblem(problem: Partial<IProblem>): Promise<IProblem>;
    getAllProblems(): Promise<IProblem[]>;
    getProblemById(id: string): Promise<IProblem | null>;
    updateProblem(id: string, problem: Partial<IProblem>): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
    searchProblems (query: string): Promise<IProblem[]>;
}

export class ProblemRepository implements IProblemRepository {
    async createProblem(problem: Partial<IProblem>): Promise<IProblem> {
        const newProblem = new Problem(problem);
        return await newProblem.save();
    }

    async getProblemById(id: string): Promise<IProblem | null> {
        return await Problem.findById(id).exec();
    }

    async getAllProblems(): Promise<IProblem[]> {
        return await Problem.find().exec();
    }

    async updateProblem(id: string, problem: Partial<IProblem>): Promise<IProblem | null> {
        return await Problem.findByIdAndUpdate(id, problem, { new: true }).exec();
    }

    async deleteProblem(id: string): Promise<boolean> {
        const result = await Problem.findByIdAndDelete(id).exec();
        return !!result;
    }

    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]> {
        return await Problem.find({ difficulty }).exec();
    }

    async searchProblems(query: string): Promise<IProblem[]> {
        return await Problem.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        }).exec();
    }
} 