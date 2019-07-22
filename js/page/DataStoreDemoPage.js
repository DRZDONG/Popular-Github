import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DataStore from '../expand/dao/DataStore'

type Props = {};
const KEY = "save_key";
export default class DataStoreDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
        this.dataDtore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataDtore.fetchData(url)
            .then(data => {
                let showData = `Initial data load time：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Offline cache framework design</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <Text onPress={() => {
                    this.loadData();
                }}>
                    get
                </Text>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
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
