import { CreateProblemDto, UpdateProblemDto } from "../dtos/problem.dto";
import { IProblem } from "../models/problem.model";
import { IProblemRepository } from "../repositories/problem.repository";


export interface IProblemService {
    createProblem(problem: CreateProblemDto): Promise<IProblem>;
    getAllProblems(): Promise<IProblem[]>;
    getProblemById(id: string): Promise<IProblem | null>;
    updateProblem(id: string, problem: UpdateProblemDto): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
    searchProblems(query: string): Promise<IProblem[]>;
}

export class ProblemService implements IProblemService {
    private problemRepository: IProblemRepository;

    constructor(problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problem: CreateProblemDto): Promise<IProblem> {
        //Todo sanitize the markdown
        return await this.problemRepository.createProblem(problem);
    }

    async getProblemById(id: string): Promise<IProblem | null> {
        return await this.problemRepository.getProblemById(id);
    }
    async getAllProblems(): Promise<IProblem[]> {
        return await this.problemRepository.getAllProblems();
    }
    async updateProblem(id: string, problem: UpdateProblemDto): Promise<IProblem | null> {
        return await this.problemRepository.updateProblem(id, problem);
    }
    async deleteProblem(id: string): Promise<boolean> {
        return await this.problemRepository.deleteProblem(id);
    }
    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]> {
        return await this.problemRepository.findByDifficulty(difficulty);
    }
    async searchProblems(query: string): Promise<IProblem[]> {
        return await this.problemRepository.searchProblems(query);
    }
}