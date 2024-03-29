import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.object().shape({
        street: Yup.string(),
        number: Yup.number(),
        complement: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        zip_code: Yup.string(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed!' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists)
      return res.status(401).json({ error: 'User already exists!!' });

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.object().shape({
        street: Yup.string(),
        number: Yup.number(),
        complement: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        zip_code: Yup.string(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed!' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists)
      return res.status(400).json({ error: 'Recipient already exists!!' });

    const recipient = await Recipient.findByPk(req.params.id);
    const recipientUpdated = await recipient.update(req.body);

    return res.json(recipientUpdated);
  }
}

export default new RecipientController();
