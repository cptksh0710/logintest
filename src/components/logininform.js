const router = express.Router();

router.get('src/page/login', (req, res) => {
	// 임시로 값을 넣어 주었다.
    res.send({data: 'data'})
});
 
module.exports = router;