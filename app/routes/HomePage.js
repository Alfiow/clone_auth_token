import React, {Component} from 'react';
import {
	AsyncStorage,
	Alert,
	Image,
	Text,
	TouchableOpacity,
	View,
	Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

class HomePage extends Component {

		async userLogout() {
			try {
				await AsyncStorage.removeItem('id_token');
				Alert.alert("Berhasil keluar");
				Actions.Authentication();
			} catch (error) {
				console.log('AsyncStorage error: ' + error.message);
			}
		}

		render() {
			return (
				<View style={styles.container}>
					<Text style={styles.buttonText}>
							Sedang Login
					</Text>
					<Button
						buttonStyle={styles.buttonStyle}
						backgroundColor='transparent'
						borderRadius={20}
						title='Keluar'
						fontFamily='Avenir'
						fontSize={16}
						onPress={this.userLogout.bind(this)}
					/>
				</View>
			);
		}
	}

	export default HomePage;
