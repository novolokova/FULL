const path = require("path") // module Node
const { Router } = require('express');
const multer = require('multer');//Middleware module - express
const groupRouter = Router();
const GroupController = require('../controllers/group.controller');
const paginate = require('../middlewares/paginate.mw');


// const upload = multer({
//     dest:path.resolve(__dirname, '../public/images') // шлях
// })

// обробляємо, щоб прилітав в певному вигляді 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)// file.originalname - то що прилітає до нас з клієнта
    }
  })
    const upload = multer({ storage })// Middleware-multer

// ==> app.use('/api', router); ==> router.use('/groups', groupRouter);- 
groupRouter.post('/', upload.single('image'), GroupController.createUserGroup);
groupRouter.post('/:idGroup', GroupController.addUserToGroups);
groupRouter.get('/', paginate, GroupController.getAllGroups);
groupRouter.get('/users/:idUser', GroupController.getUserGroups);
groupRouter.patch('/:idGroup/image', upload.single('image'), GroupController.addImageGroup);

module.exports = groupRouter;