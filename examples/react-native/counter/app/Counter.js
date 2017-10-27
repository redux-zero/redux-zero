import React, { Component } from 'react';
import { connect } from 'redux-zero/react';
import { StyleSheet, Text, View, Button } from 'react-native';
import actions from './actions';

const mapToProps = ({ count }) => ({ count });

class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>
          { count }
        </Text>
        <Button title="+" onPress={increment} />
        <Button title="-" onPress={decrement} />
      </View>
    );
  }
}

export default connect(mapToProps, actions)(Counter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  counter: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
