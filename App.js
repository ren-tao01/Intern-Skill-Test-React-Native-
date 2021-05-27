import React, {useState, useRef, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View ,
  TextInput,
  Button,
  Image,
  TouchableHighlight,
} from 'react-native';

const App = () =>{
  //useState[page, setPage] = useState(App);
  
  return(   
    <>  
      <Title /> 
      <SearchBar />
    </>
  );
}

const SearchBar = () =>{
  // read user search input
  const[input, setInput] = useState("");
  // data instances
  const[poster, setPoster] = useState();
  const[title, setTitle] = useState();
  const[year, setYear] = useState();
  // second data instances
  const[genre, setGenre] = useState();
  const[rating, setRating] = useState();
  const[plot, setPlot] = useState();

  return(
    <View>
      <View>
        <TextInput 
          style = {[
            styles.searchbar,
            {fontSize : 18,}
          ]}
          placeholder = "Enter a movie name .."
          onChangeText = {setInput}
          value = {input}
        
        />
        <Button 
          style = {styles.searchbutton}
          title = "Search"
          onPress = {()=>{
           let res = findMovie(input.toUpperCase());
            let year_string = "Year released : ";
            setPoster(res["poster"]);
            setTitle(res["title"]);
            setYear(year_string += res["year"]);
            setGenre();
            setRating();
            setPlot();
          }}
        />
      </View>
      <View 
        style ={styles.rsection}
      >
        <TouchableHighlight
          onPress = { () =>{
            let genre_string = "", rating_string = "", plot_string = "";
            let res = getRemainingData(title);
            genre_string = "Genre : ";
            rating_string = "IMDB Rating : ";
            plot_string = "Plot : ";
            setGenre(genre_string += res["genre"]);
            setRating(rating_string += res["rating"]);
            setPlot(plot_string += res["plot"]);
          }}
        >
          <Text>
            {title}<br />
            {year}
          </Text>
        
        </TouchableHighlight>
        <Image 
          source ={{
            uri : poster,
          }}
          style={{ width: 200, height: 200 }}
        />
        <View>
          <SecondPart gen={genre} rat={rating} plo={plot}/>
        </View>
      </View>
    </View>
  );
}

const SecondPart = (props) =>{
  return(
    <View>
      <Text>
        {props.gen}
      </Text>
      <Text>
        {props.rat}
      </Text>
      <Text>
        {props.plo}
      </Text>
    </View>
  );
}

const Title = () =>{
  return(
    <View>
      <Text
        style={{
          marginHorizontal: 25,
          fontSize : 50,
        }}
      >
        Movie Search
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    searchbar : {
      alignContent: 'center',
      alignSelf: 'center',
      height : 50,
      width : 300,
      padding : 10,
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 5,
    },

    searchbutton : {
      width: 50,
    },

    rsection : {
      alignContent: 'center',
      alignSelf: 'center',
    },
})

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function findMovie(name){

  let movie_data = {
    "SPIDERMAN" : data("https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_.jpg", 
                        "The Amazing Spider Man", "Action",2001), 
    "IRONMAN" : data("https://static.metacritic.com/images/products/movies/1/72d04e6d3f17f6f8eaf6123f504f54b1-250h.jpg", 
                        "Iron Man 3", "Action", 2008),
    "CONJURING" : data("https://artandhistoryoffilmspring2014.files.wordpress.com/2014/02/conjuring.jpg", 
                        "The Conjuring", "Action", 2013),
    "NO MATCHES FOUND" : data("","",""),
  }
  function data(poster, title, year){
    return {
      "poster" : poster,
      "title" : title,
      "year" : year,
      
    }
  }
  
  let input = name.replace(" ", "").toUpperCase();
  for(var x in movie_data){
    if(input.includes(x)){
      //alert(x);
      var filtered = x;
    }
    
  }
  if(movie_data.hasOwnProperty(filtered)){
    return movie_data[filtered];
  }
  else{
    alert("No such movie");
    return movie_data["NO MATCHES FOUND"];
  }

}

function getRemainingData(title){
  let movie_data ={
    "The Amazing Spider Man" : data("Action", 8.0, "Spider man is amazing"),
    "Iron Man 3" : data("Action", 9.2, "The man is iron"),
    "The Conjuring" : data("Horror", 7.3, "Vomitting blood is very scary"),
    "" : data("", "", ""),
  }

  function data(genre, rating, plot){
    return{
      "genre" : genre,
      "rating" : rating,
      "plot" : plot,
    }
  }

  return movie_data[title];
}

export default App;
