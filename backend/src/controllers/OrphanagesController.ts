import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanage_view';
import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return res.status(200).json(orphanageView.renderMany(orphanages));;
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.status(200).json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      phone,
      whatsapp,
      address,
      neighborhood,
      number,
      uf,
      zip_code,
      facebook,
      instagram,
      email,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const reqImages = req.files as Express.Multer.File[];
    const images = reqImages.map(image => {
      return { path: image.filename }
    });

    const data = {
      name,
      latitude,
      longitude,
      phone,
      whatsapp,
      address,
      neighborhood,
      number,
      uf,
      zip_code,
      facebook,
      instagram,
      email,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório.'),
      latitude: Yup.number().required('Latitude obrigatória.'),
      longitude: Yup.number().required('Longitude obrigatória.'),
      phone: Yup
        .string()
        .required('Telefone obrigatório.')
        .max(15, 'Máximo de caracteres permitido'),
      whatsapp: Yup.string().max(15, 'Máximo de caracteres permitido'),
      address: Yup.string().required('Descrição obrigatória.').max(120, 'Máximo de caracteres permitido'),
      neighborhood: Yup.string().required('Descrição obrigatória.').max(100, 'Máximo de caracteres permitido'),
      number: Yup.string().max(100, 'Máximo de caracteres permitido'),
      uf: Yup.string().required('Estado obrigatório.').max(2, 'Máximo de caracteres permitido'),
      zip_code: Yup.string().required('CEP obrigatório.').max(100),
      email: Yup.string().required('E-mail obrigatório.').max(100, 'Máximo de caracteres permitido'),
      facebook: Yup.string().max(100, 'Máximo de caracteres permitido'),
      instagram: Yup.string().max(100, 'Máximo de caracteres permitido'),
      about: Yup.string().required('Descrição obrigatória.').max(300),
      instructions: Yup.string().required('Instruções obrigatórias.'),
      opening_hours: Yup.string().required('Horário obrigatório.'),
      open_on_weekends: Yup.boolean().required('Disponibilidade obrigatória.'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required('Imagem obrigatória.'),
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
}
