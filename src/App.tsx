import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

type User = {
  createdAt: string
  name: string
  age: number
  id: string
}

const axiosInstance = axios.create({
  baseURL: "https://62e5f10dde23e2637924f2ba.mockapi.io/api/v1/",
  timeout: 3000
})

const App = () => {

  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try  {
      const { data } = await axiosInstance.get<User[]>("/users", { params: { page: 1, pageSize: 10 } })
      console.log({ data })
      setUsersList(data)
    } catch (err: any) {
      console.log(err.message)
      setUsersList([])
    }
  }

  return (
    <div>
      <h1>List of Users</h1>
      {usersList.map(item => <p>{item.id} - {item.name} - {item.age}</p>)}
    </div>
  );
}

export default App;
