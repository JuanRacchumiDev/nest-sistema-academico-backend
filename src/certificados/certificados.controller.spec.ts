import { Test, TestingModule } from '@nestjs/testing';
import { CertificadosController } from './certificados.controller.js';

describe('CertificadosController', () => {
  let controller: CertificadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificadosController],
    }).compile();

    controller = module.get<CertificadosController>(CertificadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
