import { Test, TestingModule } from '@nestjs/testing';
import { CertificadosService } from './certificados.service.js';

describe('CertificadosService', () => {
  let service: CertificadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificadosService],
    }).compile();

    service = module.get<CertificadosService>(CertificadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
