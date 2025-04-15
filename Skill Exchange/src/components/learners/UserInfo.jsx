import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'

const UserInfo = () => {

const [skill, setSkill] = useState([])
const getSkill = async()=>{
    const res = await axios.get("/skill/getallskills")
    console.log(res.data)
    setSkill( res.data.data)
}

useEffect(()=>{
    getSkill()
},[])


  return (
    <div style={{textAlign:"center"}}>
        <h1>Skills</h1>
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>Skill Name</th>
                    <th>UPDATE</th>
                </tr>
            </thead>
            <tbody>
                {
                    skill.map((pr)=>{
                        return <tr>
                            {/* <td>
                                <img style={{height:"100px", width:"100px"}} src={pr?.profilePic} />
                            </td> */}
                            <td>
                                <h2 style={{color:"white"}} src={pr?.userId}/>
                            </td>
                            <td>
                            <Link to ={`/user/updateform/${pr._id}`} className ="btn btn-info">UPDATE</Link>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default UserInfo