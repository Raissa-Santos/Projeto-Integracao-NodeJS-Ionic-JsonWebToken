import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Conta from "../models/Conta";
const jwt = require("jsonwebtoken");

export default {
  async login(request: Request, response: Response) {
    //desestruturacao
    const { email, senha } = request.body;

    const contaRepository = AppDataSource.getRepository(Conta);

    //Verificação somente para testes (substituir)

    const conta = await contaRepository.findOneBy({
      email: email,
      senha: senha
    });

    if (conta) {
      const payload = {
        email,
      };

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 300, // expires in 5min
      });

      return response.status(200).json({
        token: token,
      });
    }
    return response.status(500).json({ message: "Login inválido!" });
  },  
  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    const { email, senha } = request.body;

    const contaRepository = AppDataSource.getRepository(Conta);

    const conta = contaRepository.create({
      email,
      senha,
    });

    await contaRepository.save(conta);

    return response.status(201).json(conta);
  },
  async index(request: Request, response: Response) {
    const contaRepository = AppDataSource.getRepository(Conta);

    //Filtrar pelo nome (WHERE)
    // const users = await userRepository
    // .find({ nome: "José Carlos dos Santos" });

    //Filtrar pelo nome (WHERE) usando a função LIKE
    // const users = await userRepository
    // .find({ nome: Like("%Ana%") });

    // Filtrar as colunas (SELECT)
    // const users = await userRepository
    //   .createQueryBuilder("user")
    //   .select(["user.nome", "user.salario"])
    //   .getMany();

    //Buscar tudo
    const contas = await contaRepository.find();

    response.json(contas);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const contaRepository = AppDataSource.getRepository(Conta);

    const conta = await contaRepository.findOneBy({
      id: +id,
    }); // o + na frente é para forçar a ser number

    response.json(conta);
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const contaRepository = AppDataSource.getRepository(Conta);

    const conta = await contaRepository.findOneBy({
      id: +id,
    });

    if (conta) {
      await contaRepository.remove(conta);
      return response.status(204).json(conta);
    }
    response.status(404).json();
  },
};
