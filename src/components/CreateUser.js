import {React,useEffect,useState} from 'react';
import {Text,View,StyleSheet,Picker, TextInput} from 'react-native'

const CreateUser = () => {
    const [user, setuser] = useState({name:"",age:"",gender:"",school:""});
    const genders=[
        {
            type:"Male",value:"male"
        },
        {type:"Female",value:"female"},
        {type:"Prefer Not to Say",value:"Prefer Not to Say"}
    ]
    useEffect(()=>{
    console.log(user)
  },[user])
    return (
    <View>
        <View>
            <Text> Welcome,</Text>
            <Text>Have a Recorded Attendance for Proper Time Management</Text>
        </View>
        <View>
            <Text>Fill The Following Details to Get Started with the App.</Text>
        </View>
        <View>
            <TextInput
                placeholder="e.g. John Doe"
                onChangeText={name=>setuser({...user,name})}
                value={user['name']}
            />
         
            <TextInput
                keyboardType = 'numeric'
                placeholder="e.g. 19"
                onChangeText={age=>setuser({...user,age})}
                value={user['age']}
            />
            <Picker
                mode="dropdown"
                selectedValue={user.gender}
                onValueChange={gender=>setuser({...user,gender})}
            >
                <Picker.Item
                    key="NONE"
                    label="Gender"
                    VALUE={null}
                />
                {genders.map((item,index)=>{
                   return <Picker.Item
                        key={item.type}
                        label={item.type}
                        value={item.value}
                        index={index}
                    />
                })}
            </Picker>
            <TextInput
            keyboardType='text'
                placeholder='School/University'
                onChange={school=>setuser({...user,school})}
                value={user['school']}
            />
            
        </View>
    </View>
    )
}

export default CreateUser