import React, {Component} from 'react';
import {
	AsyncStorage,
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class Authentication extends Component {

	constructor(){
		super();
		this.state = {
			username: null,
			password: null
		}
	}

	async onValueChange(item, selectedValue) {
		try {
			await AsyncStorage.setItem(item, selectedValue);
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	userSignup() {
		if (this.state.username && this.state.password) {
			// TODO: localhost doesn't work. Get the IP address with ifconfig.
			fetch("http://211.11.1.231:3001/users", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then((response) => response.json())
			.then((responseData) => {
				this.onValueChange('id_token', responseData.id_token),
				Alert.alert(
					"Daftar sukses"
				),
				Actions.HomePage();
			})
			.done();
		}
	}

	userLogin() {
		if (this.state.username && this.state.password) {
			// TODO: localhost doesn't work. Get the IP address with ifconfig.
			fetch("http://211.11.1.231:3001/sessions/create", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
				})
			})
			.then((response) => response.json())
			.then((responseData) => {
				this.onValueChange('id_token', responseData.id_token),
				Alert.alert(
					"Berhasil masuk"
				),
				Actions.HomePage();
			})
			.done();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					Selamat Datang
				</Text>
				<View style={styles.form}>
					<TextInput
						editable={true}
						onChangeText={(username) => this.setState({username})}
						placeholder='Email'
						ref='username'
						returnKeyType='next'
						style={styles.inputText}
						value={this.state.username}
						/>
					<TextInput
						editable={true}
						onChangeText={(password) => this.setState({password})}
						placeholder='Kata sandi'
						ref='password'
						returnKeyType='next'
						secureTextEntry={true}
						style={styles.inputText}
						value={this.state.password}
						/>
					<View style={{ padding: 10 }}>
						<Button
							buttonStyle={styles.buttonStyle}
							backgroundColor='transparent'
							borderRadius={20}
							title='Masuk'
							fontFamily='Avenir'
							fontSize={16}
							onPress={this.userLogin.bind(this)}
						/>
					</View>

					<View style={{ padding: 10 }}>
						<Button
							buttonStyle={styles.buttonStyle}
							backgroundColor='transparent'
							borderRadius={20}
							title='Daftar'
							fontFamily='Avenir'
							fontSize={16}
							onPress={this.userSignup.bind(this)}
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default Authentication;
