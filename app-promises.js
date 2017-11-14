const users=[{
  id : 1,
  name : 'abhilash',
  schoolId : 123,
},{
  id : 2,
  name : 'arjun',
  schoolId : 113,
}]

const grades = [{
  id : 1,
  schoolId : 123,
  grade : 89
},{
  id : 2,
  schoolId : 113,
  grade : 99
},{
  id : 3,
  schoolId : 123,
  grade : 93
  }]
getUser = (id)=>{
  return new Promise((resolve,reject)=>{
    var user = users.find((user)=>user.id===id);
    if(user){
      resolve(user)
    }
    else {
      reject('unable to find user');
    }
  })
}

getGrades = (schoolId)=>{
  return new Promise((resolve,reject)=>{
    resolve(grades.filter((grade)=>grade.schoolId===schoolId));
  })
}

getStatus = (userId)=>{
  let user;
  return getUser(userId).then((tempUser)=>{
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades)=>{
    let average = 0;
    average = grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length;
    return `${user.name} has ${average}% in class` ;
  })
}

getStatus(2).then((status)=>{
  console.log(status);
}).catch((e)=>{
  console.log(e)
})
