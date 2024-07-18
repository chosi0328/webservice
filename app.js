
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const users = [
    {id: "hong", name: '홍길동', pwd: '1234'},
    {id: "kim", name: '김길동', pwd: '1234'},
    {id: "so", name: '소길동', pwd: '1234'},
    {id: "na", name: '나길동', pwd: '1234'},
];

// GET /user
app.get('/user', (req, res) => {
    const userId = req.query.id; // 쿼리 파라미터에서 id를 가져옵니다.
    if (userId) {
      const user = users.find(user => user.id === userId); // 해당 id를 가진 사용자를 찾습니다.
      if (user) {
        res.send({
          userData: user
        });
      } else {
        res.status(400).send({
          message: '해당 유저가 존재하지 않습니다.'
        });
      }
    } else {
      // id 쿼리 파라미터가 없는 경우, 모든 사용자 정보 반환
      res.send({
        userData: users
      });
    }
  });

app.post('/user', (req, res) => {
    const newUser = req.body;
  
    const existingUser = users.find(user => user.id === newUser.id);
    if (existingUser) {
        return res.status(400).send("이미 존재하는 사용자입니다.");
    }
  
    if (newUser.pwd.length < 8) {
        return res.status(400).send("비밀번호는 8자 이상이어야 합니다.");
    }
  
    users.push(newUser);
    res.send("새로운 사용자가 추가되었습니다.");
});

app.put('/user', (req, res) => {
    const updatedUser = req.body;
  
    const existingUserIndex = users.findIndex(user => user.id === updatedUser.id);
    if (existingUserIndex === -1) {
        return res.status(404).send("해당하는 ID의 사용자를 찾을 수 없습니다.");
    }
  
    if (updatedUser.pwd.length < 8) {
        return res.status(400).send("비밀번호는 8자 이상이어야 합니다.");
    }
    users[existingUserIndex] = updatedUser;
    res.send("사용자 정보가 업데이트되었습니다.");
})

app.delete('/user', (req, res) => {
    const userId = req.body.id;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send("해당하는 ID의 사용자를 찾을 수 없습니다.");
    }
    users.splice(userIndex, 1);
    res.send("사용자 정보가 삭제되었습니다.");
})

app.get('/user', async (req, res) => {
  const id = req.query.id;

  try {
    if (id) {
     
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      
      const users = await User.findAll();
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user(s)' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
