const createError = require('http-errors');
const _ = require('lodash');
const { Group, User } = require('../models');

const checkBody = (body) =>
// pick - створює обїєкт та повертає тільки ті данні, які вкажемо 
  _.pick(body, ['name', 'descriptition', 'isAdult']);
// захищає від непотрібних данних які можуть зіпсувати нащі данні в БД

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const {
      body,
      file: { filename },
    } = req;
    const values = checkBody(body);
    const group = await Group.create({...values, imagePath: filename });
    if (!group) {
      return next(createError(400, 'Bad request'));
    }
    const user = await User.findByPk(body.userId);
    if (!user) {
      return next(createError(404, 'user not found'));
    }
    await group.addUser(user); // створює кортеж в додатковій таблиці users_to_groups,
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userWithGroups = await User.findByPk(idUser, {
      include: {
        // прибрали зайву інфу, з додаткової таблиці users_to_groups
        model: Group,
        through: {
          attributes: [],
        },
      },
    });
    if (!userWithGroups) {
      return next(createError(404, 'not found'));
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addImageGroup = async (req, res, next) => {
  try {
    const {
      body,
      params: { idGroup },
      file: { filename }, // пришел к нам из  (встроенного) Middleware - multer -express(Handle multi-part form data.)
    } = req;
    //console.log(req.file)- багато властивостей по яким можемо валідувати(через власний мiddleware) наш Image()
    const values = checkBody(body);
    const [rowCount, [updatedGroups]] = await Group.update(
      {...values, imagePath: filename },
      { where: { id: idGroup }, 
      returning: true }
    );
    if (!updatedGroups) {
      return next(createError(400, 'Bad request'));
    }
    res.status(200).send({ data: updatedGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroups = async (req, res, next) => {
  try {
    //get id user & group
    const {
      params: { idGroup },
      body: { userId },
    } = req;
    //find by pk group
    const group = await Group.findByPk(idGroup);
    //handle errors
    if (!group) {
      return next(createError(404, 'group not found'));
    }
    //find by bk user
    const user = await User.findByPk(userId);
    //handle errors
    if (!user) {
      return next(createError(404, 'user not found'));
    }
    //add user to group magic method
    await group.addUser(user);
    //send group with users
    //const groupWithUsers = await group.getUsers(); // массив з усіма users в певній групі

    const groupWithUsers = await Group.findByPk(idGroup, {// інф. про групу, та окрема інф.про users
      include: {
        model: User,
        attributes: ['email'],
        through: {
          attributes: [],
        },
      },
    });

    res.status(200).send({ data: groupWithUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const group = await Group.findAll({
      ...paginate
    });
    if (!group) {
      return next(createError(404, 'Groups not found'));
    }
    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

