import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";


type Props = {};
const KEY="save_key";
export default class AsyncStorageDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>AsyncStorage 使用</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <View style={styles.input_container}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>
                        save
                    </Text>
                    <Text onPress={() => {
                        this.doRemove();
                    }}>
                        delete
                    </Text>
                    <Text onPress={() => {
                        this.getData();
                    }}>
                        get
                    </Text>

                </View>

                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }

    /**
     * save data
     * @returns {Promise.<void>}
     */
    async doSave() {
        //1 edition
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        });

        // //2 edition
        // AsyncStorage.setItem(KEY, this.value)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        //
    }

    /**
     * delete data
     * @returns {Promise.<void>}
     */
    async doRemove() {
        //1 edition
        AsyncStorage.removeItem(KEY,error => {
            error && console.log(error.toString());
        });

        // 2 edition
        // AsyncStorage.removeItem(KEY)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        //
    }

    /**
     * fetch data
     */
    async getData() {
        //1 edition
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value
            });
            console.log(value);
            error && console.log(error.toString());
        });
        // //2 edition
        // AsyncStorage.getItem(KEY)
        //     .then(value => {
        //         this.setState({
        //             showText: value
        //         });
        //         console.log(value);
        //
        //     })
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
