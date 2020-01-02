import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firebase from '../../config/config';


export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      errorMessage: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={(id) => this.setState({ id })} value={this.state.id} style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="תעודת זהות"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="numeric"
          onSubmitEditing={() => this.password.focus()}
        />

        <TextInput onChangeText={(password) => this.setState({ password })} value={this.state.password} style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="סיסמה"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input}
        />

        {this.state.errorMessage ? <Text style={styles.errorMessage}> {this.state.errorMessage} </Text> : null}
        <TouchableOpacity onPress={() => this.loginUser(this.state.id, this.state.password)} style={styles.button}>
          <Text style={styles.buttonText}>התחברות</Text>
        </TouchableOpacity>
      </View>
    )
  }


  loginUser = async (id, password) => {

    console.log('id: ' + id);
    if (id != '' && password != '') {
      try {
        let user = await firebase.auth().signInWithEmailAndPassword(this.state.id, this.state.password);
        props.navigation.navigate('SwDashboard');
        console.log(user);
      } catch (error) {
        this.addError();
        console.log(error);
      }
    }
    else {
      this.addError();
    }

  }

  addError = () =>{
    this.setState({errorMessage : 'שם משתמש או סיסמה שגויים'});
    console.log('errorm'+this.state.errorMessage);
  }


}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 20,
    color: '#ffffff',
    marginVertical: 10
  },
  button: {
    width: 200,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  errorMessage: {
    fontSize:18,
    fontWeight:'700',
    color:'red'
  }
});