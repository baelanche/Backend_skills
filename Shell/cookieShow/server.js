const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(3000, () => console.log("server on"));

// dummy data
const shows = [
 { id: 1, name: "show1", showStartDate: "202208171530", showEndDate: "202208171630",
    seats: [
      {1: false},
      {2: false},
      {3: false},
    ] 
 },
 { id: 2, name: "show2", showStartDate: "202208171630", showEndDate: "202208171730",
    seats: [
      {1: false},
      {2: false},
      {3: false},
    ] 
 }
];

app.get("/shows", (req, res) => {
    res.json({ok: true, shows: shows});
})

app.get("/shows/:show_id", (req, res) => {
    const show_id = req.query.show_id
    const show = shows.filter(data => data.id == show_id);

    res.json({ok: true, show: show})
})

app.post("/shows/add", (req, res) => {
    const { id, name, showStartDate, showEndDate, seats } = req.body
    const show = shows.concat({id, name, showStartDate, showEndDate, seats});

    res.json({ok: true, shows: show})
})

/**
 * @path {PUT} http://localhost:3000/api/users/update
 * @description 전체 데이터를 수정할 때 사용되는 Method
 */
app.put("/shows/", (req, res) => {
    
    // 구조분해를 통해 id 와 name을 추출
    const { id, name } = req.body

    //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
    const user = users.map(data => {

        if(data.id == id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})

/**
 * @path {PATCH} http://localhost:3000/api/user/update/:user_id
 * @description 단일 데이터를 수정할 때 사용되는 Method
 */
app.patch("/show/reserve/:show_id", (req, res) => {
    const { show_id } = req.params
    const { show_seat } = req.body

    const show = shows.map(data => {

        if(data.id == show_id) data = data

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})

/**
 * @path {DELETE} http://localhost:3000/api/user/delete
 * @description 데이터 삭제
 * 
 */
app.delete("/api/user/delete", (req, res) => {

    const user_id = req.query.user_id

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    const user = users.filter(data => data.id != user_id );

    res.json({ok: true, users: user})
})
