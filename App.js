import React, {useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=eab754de"
  const [state,setState] = useState({
    s: "Enter a keyword...",
    results: [],
    selected: {}
  });


  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search
      console.log(results)
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>MOVIE SEARCH</Text>
      <TextInput
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return { ...prevState, s: text }
        })}
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
        <View key={result.imdbID} style={styles.result}>
            <Image
              source={{ uri: result.Poster }}
              style={{
                width: '100%',
                height: 400
              }}
              resizeMode="cover"
            />
            <Text style={styles.heading}>{result.Title} ({result.Year})</Text>
          </View>
        ))}
      </ScrollView>    
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 40
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  popup: {
    padding: 20
  },
  poptitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 5
  }
})
