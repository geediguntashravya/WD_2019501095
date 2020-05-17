import React from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

function Task(props) {
    return (
    <View style={styles.container}>
      <Text>{<b>TaskName:</b>}{props.name} {<b>TaskID:</b>}{props.tid} {<b>TaskDate:</b>}{props.dueDate}{"==>"}{props.delButton}</Text>
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
	
	handleDeleteTask(taskid){
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
	
    render() {
        return (
            <View>
                <Text style={{textAlign:"center"}}>TODO List</Text>
                    {
                        this.state.list.map((t) =>				
                            <Task key={t.id} tid={t.id} name={t.name} dueDate={t.dueDate} 
                            delButton={<Button title="Delete" onPress={() =>this.handleDeleteTask(t.id)}>Del</Button>} />)
                    }
                <TasknameForm onAddTask={this.handleAddTask} />
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
        const task = {id:Date.now(),name:this.state.taskname,dueDate:new Date().toLocaleDateString()};
        this.props.onAddTask(task);
    }

    handleChange(event) {
		if(event.target.name=="taskname"){
			this.setState({taskname:event.target.value});
		}
		if(event.target.name=="dueDate"){
			this.setState({dueDate:event.target.value});
		}
        
    }

    render() {
        return(
            <View>
                    <TextInput name="taskname" placeholder="Enter" value={this.state.taskname} onChange={this.handleChange} /><br></br>
                    {/* <input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleChange} /> */}
                    <Button title="add task" onPress={this.handleSubmit}/>
                    
            </View>
        );
    }
}

// ReactDOM.render(
//     <TodoList list={[]} />,
//     document.getElementById('props')
// );