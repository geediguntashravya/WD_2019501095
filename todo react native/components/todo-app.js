import React from "react";
import {View, Text, TextInput, Button, StyleSheet, ScrollView} from "react-native";
import DatePicker from 'react-native-datepicker';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

function Task(props) {
    if(props.isDone==true) {
        return (
            <View style={styles.container}>
            <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{props.name} {props.tid} {props.dueDate} </Text>
            {props.delButton} 
            {props.markButton}
            </View>
        )
    }
    return (
    <View style={styles.container}>
      <Text>{props.name} {props.tid} {props.dueDate} </Text>
      {props.delButton} 
      {props.markButton}
    </View>
    )
}


export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state={list:props.list};
        this.handleAddTask=this.handleAddTask.bind(this);
    }

    handleAddTask(task) {
        this.state.list.push(task);
        this.setState({list:this.state.list})
    }
	
	handleDeleteTask(taskid) {
		console.log(taskid);
		let i=0;
		for(i=0;i<this.state.list.length;i++){
			if(this.state.list[i].id==taskid){				
				break;
			}
		}
		let task_list=this.state.list;
		task_list.splice(i,1);
		this.setState({list:task_list});
        }
    
        handleMarkTask(taskid) {
            console.log("mark clicked",taskid)
            this.list=this.state.list.filter((t)=>
            {
                if(t.id===taskid) {
                    t.isDone=true;
                    console.log("marked")
                }
                return t;
            })
            this.setState({list:this.list})
            console.log(this.state.list)
        }
	
    render() {
        return (
            <View>
                <ScrollView>
                <Text style={{textAlign:"center"}}>TODO List</Text>
                    {
                        this.state.list.map((t) =>				
                            <Task key={t.id} tid={t.id} name={t.name} dueDate={t.dueDate} 
                            delButton={<Button title="Delete" onPress={() =>this.handleDeleteTask(t.id)}/>}
                            markButton={<Button title="Mark" onPress={() =>this.handleMarkTask(t.id)}/>} />)
                    }
                <TasknameForm onAddTask={this.handleAddTask} />
                </ScrollView>
            </View>
        );
    }
}

class TasknameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={taskname:'',dueDate:''};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
		//console.log(event);
        const taskList=this.props.taskList;
        event.preventDefault();
        const task = {id:Date.now(),name:this.state.taskname,dueDate:this.state.dueDate};
        this.props.onAddTask(task);
    }

    handleChange(event) {
		//if(event.target.name=="taskname"){
		this.setState({taskname:event.nativeEvent.text});
		// if(event.target.name=="dueDate"){
		// 	this.setState({dueDate:event.target.value});
		// }
        
    }

    render() {
        return(
            <View>
                    <TextInput name="taskname" placeholder="Enter" value={this.state.taskname} onChange={this.handleChange} />
                    {/* <input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleChange} /> */}
                    <DatePicker
                        style={{width: 200}}
                        dueDate={this.state.dueDate} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2016"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                            },
                            dateInput: {
                            marginLeft: 36
                            }
                        }}
                        onDateChange={(dueDate) => {this.setState({dueDate})}}
                        />
                    <Button title="add task" onPress={this.handleSubmit}/>
 
            </View>
        );
    }
}

// ReactDOM.render(
//     <TodoList list={[]} />,
//     document.getElementById('props')
// );