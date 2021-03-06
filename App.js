import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Alert, Picker, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { CheckBox } from 'react-native-elements';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Genwis Dashboard',
  };

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1,alignItems:'stretch' }}>
        <View style={{ flex:1,backgroundColor:'#fff', flexDirection: 'column',alignItems:'center', justifyContent: 'center',padding:10}}>
        <Button
          onPress={() => this.props.navigation.navigate('Addz')}
          title="ADD ATTRACTION"
          color='#27ae60'
        />
        <Text></Text>
        <Button
          onPress={() => this.props.navigation.navigate('AddPhoto')}
          title="ADD PHOTO"
          color='#27ae60'
        />
        <Text></Text>
        <Button
          onPress={() => this.props.navigation.navigate('UpdateAttr')}
          title="UPDATE ATTRACTION"
          color='#27ae60'
        />
        </View>
      </View>
    );
  }
}

class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', ''),//const id = navigation.getParam('id', `attraction hasn't succesfully been added!`);
      imageName: '',
      imageSize: '',
      imageType: '',
      imageSrc: '',
      imagePath: 'No file chosen',
      statuz: '',
    };
    this.pick = this.pick.bind(this);
    this.uploadI = this.uploadI.bind(this);
    //this.post = this.post.bind(this);
  }
  static navigationOptions = {
      title: 'Add image',
    };

    pick(){
      var ImagePicker = require('react-native-image-picker');

      // More info on all the options is below in the README...just some common use cases shown here
      var options = {
      title: 'Select image',
      // customButtons: [
      // {name: 'fb', title: 'Choose Photo from Facebook'},
      // ],
      storageOptions: {
      skipBackup: true,
      path: 'images'
      }
      };
      /**
      * The first arg is the options object for customization (it can also be null or omitted for default options),
      * The second arg is the callback which sends object: response (more info below in README)
      */
      ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
      console.log('User cancelled image picker');
      }
      else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      }
      else {
      let source = response.uri;
      let name = response.fileName;
      let size = response.fileSize;
      let type = response.type;
      let path = response.path;

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        imageSrc: source,
        imageName: name,
        imageSize: size,
        imageType: type,
        imagePath: path,
      });
      }
      });
    }

    uploadI(iname,itype,isrc,atrid){
      //console.log(atrid)
      this.setState({statuz: 'Uploading... please wait'});
      var vv = "http://api.generatorwisata.com/api/attraction/upload/"+atrid;
      // console.log(vv)
      // console.log(isrc)
      // console.log(itype)
      // console.log(iname)
      let data = new FormData()
      data.append('file', {uri: isrc, type: 'image/jpeg', name: 'photoProfile.jpeg'})
      //fetch("http://api.generatorwisata.com/api/attraction/upload/"+atrid, {
      fetch("http://api.generatorwisata.com/api/attraction/upload/"+atrid, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authentication': 'WshVVPQWJjdjOZckJvsdOiVGwp3KkMNQvPNCjXehlMVEt4s7EYN3lvybTs8TWwPPZvwLvensenLo6cOHVR01inbulpZgXcaQCwpenKU6CgVW53YiZt34mdBY'
      },
      body: data
    }).then((response) => response.text())
      .then((responseText) => {
         console.log(responseText);
         this.setState({statuz: 'Uploading success!'});
      }).catch((error) => {
      console.error(error);
      this.setState({statuz: 'Uploading failed!'});
    });


    // .then((response) => response.json())
    //   .then((responseData) => {
    //     return fetch(api.searchservice + responseData)
    //       .then((response) => response.json())
    //       .then((responseData) => {
    //         console.log(responseData);
    //       })
    //   })
    //   .catch(function (err) {
    //     return err;
    //     console.log(err);
    //   });



    // .then(response => {
    //           console.log("image uploaded")
    //         }).catch(err => {
    //           console.log(vv+" "+err)
    //         })

    }

  render() {
    //const { navigate } = this.props.navigation;








    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>Attraction ID</Text>
        <TextInput
          style={styles.inputtext}
          onChangeText={(value) => this.setState({id: value})}
          placeholder="Attraction ID"
          value={this.state.id}
        />

        <Button onPress={this.pick} title="SELECT IMAGE" color='#27ae60'/>
        <Text style={{paddingTop:10,paddingBottom:10}}>File: {this.state.imagePath}</Text>

<Button color='#27ae60' onPress={() => this.uploadI(this.state.imageName,this.state.imageType,this.state.imageSrc,this.state.id)} title="UPLOAD"/>
        <Text>{this.state.statuz}</Text>
        {/*

          <Image source={require(this.state.avatarSource.toString())} />

        */}
        </ScrollView>
      </View>
    );
  }
}

class UpdateAttr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      website: '',
      phone: '',
      rec_dur: '',
      price: '',
      route: '',
      loc_id: '',
      desc: '',
      coor_la: '',
      coor_lo: '',
      rating: '',
      culture: false,
      outdoors: false,
      history: false,
      shopping: false,
      wildlife: false,
      beaches: false,
      mountain: false,
      museum: false,
      amusement: false,
      hidden_paradise: false,
      open1: false,
      opent1: '',
      closet1: '',
      open2: false,
      opent2: '',
      closet2: '',
      open3: false,
      opent3: '',
      closet3: '',
      open4: false,
      opent4: '',
      closet4: '',
      open5: false,
      opent5: '',
      closet5: '',
      open6: false,
      opent6: '',
      closet6: '',
      open7: false,
      opent7: '',
      closet7: '',
      statuz1: '',
      statuz2: '',
    };
    //this.post = this.post.bind(this);
    this.fillData = this.fillData.bind(this);
  }
  static navigationOptions = {
      title: 'UPDATE ATTRACTION',
    };
  fillData(){
    console.log(this.state.id)
    if(this.state.id!=''){

    fetch('http://api.generatorwisata.com/api/attraction/'+this.state.id)
          .then((response) => response.json())
          .then((responseJson) => {
           //this.setState({content: responseJson});
           console.log(responseJson)
           //console.log(responseJson.id)
           if(responseJson.hasOwnProperty('id')){
           this.setState({name: responseJson.name});
           this.setState({website: responseJson.website});
           this.setState({phone: responseJson.phone_number});
           this.setState({rec_dur: responseJson.recommended_duration});
           console.log(responseJson.opening_hours[0].open)
           this.setState({price: responseJson.price});
           this.setState({rating: responseJson.rating}); // to be added
           this.setState({route: responseJson.route});
           this.setState({desc: responseJson.description});
           this.setState({loc_id: responseJson.location_id});//loc id

           this.setState({coor_la: responseJson.coordinate.latitude});
           this.setState({coor_lo: responseJson.coordinate.longitude});//longtitude

           this.setState({culture: responseJson.tags.culture});
           this.setState({outdoors: responseJson.tags.outdoors});
           this.setState({history: responseJson.tags.history});
           this.setState({shopping: responseJson.tags.shopping});
           this.setState({wildlife: responseJson.tags.wildlife});
           this.setState({beaches: responseJson.tags.beaches});
           this.setState({mountain: responseJson.tags.mountain});
           this.setState({museum: responseJson.tags.museum});
           this.setState({amusement: responseJson.tags.amusement});
           this.setState({hidden_paradise: responseJson.tags.hidden_paradise});

           this.setState({open1: responseJson.opening_hours[0].open});
           this.setState({opent1: responseJson.opening_hours[0].time.open});
           this.setState({closet1: responseJson.opening_hours[0].time.close});
           this.setState({open2: responseJson.opening_hours[1].open});
           this.setState({opent2: responseJson.opening_hours[1].time.open});
           this.setState({closet2: responseJson.opening_hours[1].time.close});
           this.setState({open3: responseJson.opening_hours[2].open});
           this.setState({opent3: responseJson.opening_hours[2].time.open});
           this.setState({closet3: responseJson.opening_hours[2].time.close});
           this.setState({open4: responseJson.opening_hours[3].open});
           this.setState({opent4: responseJson.opening_hours[3].time.open});
           this.setState({closet4: responseJson.opening_hours[3].time.close});
           this.setState({open5: responseJson.opening_hours[4].open});
           this.setState({opent5: responseJson.opening_hours[4].time.open});
           this.setState({closet5: responseJson.opening_hours[4].time.close});
           this.setState({open6: responseJson.opening_hours[5].open});
           this.setState({opent6: responseJson.opening_hours[5].time.open});
           this.setState({closet6: responseJson.opening_hours[5].time.close});
           this.setState({open7: responseJson.opening_hours[6].open});
           this.setState({opent7: responseJson.opening_hours[6].time.open});
           this.setState({closet7: responseJson.opening_hours[6].time.close});
         }else{
           this.setState({statuz1:JSON.stringify(responseJson)});
         }
          })
          .catch((error) => {
            console.error(error);
            this.setState({statuz1: `something went wrong, couldn't get the data`})
          });
        }
  }


  update(atrid){
console.log('post')
    var jsonBod = JSON.stringify(
      {
        name: this.state.name,
        website: this.state.website,
        phone_number: this.state.phone,
        recommended_duration: parseInt(this.state.rec_dur),
        price: parseInt(this.state.price),
        route: this.state.route,
        location_id: this.state.loc_id,
        description: this.state.desc,
        coordinate: {
          latitude: this.state.coor_la,
          longitude: this.state.coor_lo
        },
        tags: {
          culture: this.state.culture,
          outdoors: this.state.outdoors,
          history: this.state.history,
          shopping: this.state.shopping,
          wildlife: this.state.wildlife,
          beaches: this.state.beaches,
          mountain: this.state.mountain,
          Museum: this.state.museum,
          Amusement: this.state.amusement,
          hidden_paradise: this.state.hidden_paradise
        },
        opening_hours: [
        {
          open: this.state.open1,
          time: {
            open: parseInt(this.state.opent1),
            close: parseInt(this.state.closet1)
          }
        },
        {
          open: this.state.open2,
          time: {
            open: parseInt(this.state.opent2),
            close: parseInt(this.state.closet2)
          }
        },
        {
          open: this.state.open3,
          time: {
            open: parseInt(this.state.opent3),
            close: parseInt(this.state.closet3)
        }
        },
        {
          open: this.state.open4,
          time: {
            open: parseInt(this.state.opent4),
            close: parseInt(this.state.closet4)
        }
        },
        {
          open: this.state.open5,
          time: {
            open: parseInt(this.state.opent5),
            close: parseInt(this.state.closet5)
        }
        },
        {
          open: this.state.open6,
          time: {
            open: parseInt(this.state.opent6),
            close: parseInt(this.state.closet6)
        }
        },
        {
          open: this.state.open7,
          time: {
            open: parseInt(this.state.opent7),
            close: parseInt(this.state.closet7)
        }
        }
      ]
      }
    );
    if(((this.state.opent1>=0&&this.state.opent1<=23)||this.state.opent1==null||this.state.opent1=='')
    &&((this.state.opent2>=0&&this.state.opent2<=23)||this.state.opent2==null||this.state.opent2=='')
    &&((this.state.opent3>=0&&this.state.opent3<=23)||this.state.opent3==null||this.state.opent3=='')
    &&((this.state.opent4>=0&&this.state.opent4<=23)||this.state.opent4==null||this.state.opent4=='')
    &&((this.state.opent5>=0&&this.state.opent5<=23)||this.state.opent5==null||this.state.opent5=='')
    &&((this.state.opent6>=0&&this.state.opent6<=23)||this.state.opent6==null||this.state.opent6=='')
    &&((this.state.opent7>=0&&this.state.opent7<=23)||this.state.opent7==null||this.state.opent7=='')
    &&((this.state.closet1>=0&&this.state.closet1<=23)||this.state.closet1==null||this.state.closet1=='')
    &&((this.state.closet2>=0&&this.state.closet2<=23)||this.state.closet2==null||this.state.closet2=='')
    &&((this.state.closet3>=0&&this.state.closet3<=23)||this.state.closet3==null||this.state.closet3=='')
    &&((this.state.closet4>=0&&this.state.closet4<=23)||this.state.closet4==null||this.state.closet4=='')
    &&((this.state.closet5>=0&&this.state.closet5<=23)||this.state.closet5==null||this.state.closet5=='')
    &&((this.state.closet6>=0&&this.state.closet6<=23)||this.state.closet6==null||this.state.closet6=='')
    &&((this.state.closet7>=0&&this.state.closet7<=23)||this.state.closet7==null||this.state.closet7=='')
){
    fetch('http://api.generatorwisata.com/api/attraction/'+atrid, {
      method: 'PUT',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'Content-Type: application/json',
        'Authentication': 'WshVVPQWJjdjOZckJvsdOiVGwp3KkMNQvPNCjXehlMVEt4s7EYN3lvybTs8TWwPPZvwLvensenLo6cOHVR01inbulpZgXcaQCwpenKU6CgVW53YiZt34mdBY'
      },
      body: jsonBod,
    }).then((response) => response.text())
      .then((responseText) => {
         console.log(responseText);
         //this.setState({data: '',status: responseText});
         Alert.alert(
           'Notice',
           'Update success',
           [
             {text: 'OK', onPress: () => console.log('OK Pressed')},
           ],
           { cancelable: false }
         )
      }).catch((error) => {
      console.error(error);
    });
  }else{
    Alert.alert(
      'Alert',
      `Something went wrong, please only input number in 0-23 range`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
    //console.log(jsonBod)
  }
  render() {
    var empty = <View></View>;
    var open1b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent1: value})}
      placeholder="Open time"
      value={this.state.opent1.toString()} maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet1: value})}
      placeholder="Close time"
      value={this.state.closet1.toString()} maxLength={2}
    />
    </View>;
    var open2b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent2: value})}
      placeholder="Open time"
      value={this.state.opent2.toString()} maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet2: value})}
      placeholder="Close time"
      value={this.state.closet2.toString()} maxLength={2}
    />
    </View>;
    var open3b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent3: value})}
      placeholder="Open time"
      value={this.state.opent3.toString()} maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet3: value})}
      placeholder="Close time"
      value={this.state.closet3.toString()} maxLength={2}
    />
    </View>;
    var open4b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent4: value})}
      placeholder="Open time"
      value={this.state.opent4.toString()} maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet4: value})}
      placeholder="Close time"
      value={this.state.closet4.toString()} maxLength={2}
    />
    </View>;
    // var open4b = <View>
    // <Text>Open Time</Text>
    // <TextInput
    //   style={styles.inputtext}
    //   onChangeText={(value) => this.setState({opent4: value})}
    //   placeholder="Open time"
    //   value={this.state.opent4.toString()}
    // />
    // <Text>Close Time</Text>
    // <TextInput
    //   style={styles.inputtext}
    //   onChangeText={(value) => this.setState({closet4: value})}
    //   placeholder="Close time"
    //   value={this.state.closet4.toString()}
    // />
    // </View>;
    var open5b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent5: value})}
      placeholder="Open time"
      value={this.state.opent5.toString()} maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet5: value})}
      placeholder="Close time"
      value={this.state.closet5.toString()} maxLength={2}
    />
    </View>;
    var open6b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent6: value})}
      placeholder="Open time"
      value={this.state.opent6.toString()} maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet6: value})}
      placeholder="Close time"
      value={this.state.closet6.toString()} maxLength={2}
    />
    </View>;
    var open7b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent7: value})}
      placeholder="Open time"
      value={this.state.opent7.toString()}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet7: value})}
      placeholder="Close time"
      value={this.state.closet7.toString()}
      maxLength={2}
    />
    </View>;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text>Attraction ID</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({id: value})}
            placeholder="Attraction ID"
            value={this.state.id}
          />
          <Button
            title="Get Form"
            onPress={this.fillData}
            color='#27ae60'
          />
          <Text>{this.state.statuz1}</Text>
          <Text>Name</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({name: value})}
            placeholder="Name"
            value={this.state.name}
          />
          <Text>Website</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({website: value})}
            placeholder="Website"
            value={this.state.website}
          />
          <Text>Phone</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({phone: value})}
            placeholder="Phone"
            value={this.state.phone}
          />
          <Text>Recommended Duration</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({rec_dur: value})}
            placeholder="Recommended Duration"
            value={this.state.rec_dur.toString()}
          />
          <Text>Price</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({price: value})}
            placeholder="Price"
            value={this.state.price.toString()}
          />
          <Text>Route</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({route: value})}
            placeholder="Route"
            value={this.state.route}
          />
          <Text>Location Id</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({loc_id: value})}
            placeholder="Location Id"
            value={this.state.loc_id}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({desc: value})}
            placeholder="Description"
            value={this.state.desc}
          />
          <Text>Coordinate Latitude</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({coor_la: value})}
            placeholder="Coordinate Latitude"
            value={this.state.coor_la}
          />
          <Text>Coordinate Longtitude</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({coor_lo: value})}
            placeholder="Coordinate Longtitude"
            value={this.state.coor_lo}
          />
          <CheckBox
            title='Culture'
            checked={this.state.culture}
            onPress={(value) => this.setState({culture: !this.state.culture})}
          />
          <CheckBox
            title='Outdoors'
            checked={this.state.outdoors}
            onPress={(value) => this.setState({outdoors: !this.state.outdoors})}
          />
          <CheckBox
            title='History'
            checked={this.state.history}
            onPress={(value) => this.setState({history: !this.state.history})}
          />
          <CheckBox
            title='Shopping'
            checked={this.state.shopping}
            onPress={(value) => this.setState({shopping: !this.state.shopping})}
          />
          <CheckBox
            title='Wildlife'
            checked={this.state.wildlife}
            onPress={(value) => this.setState({wildlife: !this.state.wildlife})}
          />
          <CheckBox
            title='Beaches'
            checked={this.state.beaches}
            onPress={(value) => this.setState({beaches: !this.state.beaches})}
          />
          <CheckBox
            title='Mountain'
            checked={this.state.mountain}
            onPress={(value) => this.setState({mountain: !this.state.mountain})}
          />
          <CheckBox
            title='Museum'
            checked={this.state.museum}
            onPress={(value) => this.setState({museum: !this.state.museum})}
          />
          <CheckBox
            title='Amusement'
            checked={this.state.amusement}
            onPress={(value) => this.setState({amusement: !this.state.amusement})}
          />
          <CheckBox
            title='Hidden Paradise'
            checked={this.state.hidden_paradise}
            onPress={(value) => this.setState({hidden_paradise: !this.state.hidden_paradise})}
          />
          <Text style={styles.head}>Open Hours</Text>
          <CheckBox
            title='Senin'
            checked={this.state.open1}
            onPress={(value) => this.setState({open1: !this.state.open1})}
          />
          {this.state.open1 ? open1b : empty}
          <CheckBox
            title='Selasa'
            checked={this.state.open2}
            onPress={(value) => this.setState({open2: !this.state.open2})}
          />
          {this.state.open2 ? open2b : empty}
          <CheckBox
            title='Rabu'
            checked={this.state.open3}
            onPress={(value) => this.setState({open3: !this.state.open3})}
          />
          {this.state.open3 ? open3b : empty}
          <CheckBox
            title='Kamis'
            checked={this.state.open4}
            onPress={(value) => this.setState({open4: !this.state.open4})}
          />
          {this.state.open4 ? open4b : empty}
          <CheckBox
            title='Jumat'
            checked={this.state.open5}
            onPress={(value) => this.setState({open5: !this.state.open5})}
          />
          {this.state.open5 ? open5b : empty}
          <CheckBox
            title='Sabtu'
            checked={this.state.open6}
            onPress={(value) => this.setState({open6: !this.state.open6})}
          />
          {this.state.open6 ? open6b : empty}
          <CheckBox
            title='Minggu'
            checked={this.state.open7}
            onPress={(value) => this.setState({open7: !this.state.open7})}
          />
          {this.state.open7 ? open7b : empty}
          <Button
            onPress={() => this.update(this.state.id)}
            title="SUBMIT"
            color='#27ae60'
          />
        </ScrollView>
      </View>
    );
  }
  }


class Addz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      website: '',
      phone: '',
      rec_dur: '',
      price: '',
      route: '',
      loc_id: '',
      desc: '',
      coor_la: '',
      coor_lo: '',
      culture: false,
      outdoors: false,
      history: false,
      shopping: false,
      wildlife: false,
      beaches: false,
      mountain: false,
      museum: false,
      amusement: false,
      hidden_paradise: false,
      open1: false,
      opent1: '',
      closet1: '',
      open2: false,
      opent2: '',
      closet2: '',
      open3: false,
      opent3: '',
      closet3: '',
      open4: false,
      opent4: '',
      closet4: '',
      open5: false,
      opent5: '',
      closet5: '',
      open6: false,
      opent6: '',
      closet6: '',
      open7: false,
      opent7: '',
      closet7: '',
      //locitem: {'1':'a','2':'b','3':'c'},
      isLoading: true,
      locitem: {},
      selected: '',
    };
    this.post = this.post.bind(this);
  }
  static navigationOptions = {
      title: 'ADD',
    };
  // var jsonBod = JSON.stringify({
  //   [
  //     name: this.state.name,
  //     website: this.state.website,
  //     phone_number: this.state.phone,
  //     recommended_duration: parseInt(this.state.rec_dur,
  //     price: parseInt(this.state.price,
  //     route: this.state.route,
  //     location_id: this.state.loc_id,
  //     description: this.state.desc,
  //     coordinate: [
  //       latitude: this.state.coor_la,
  //       longtitude: this.state.coor_lo
  //     ],
  //     tags: [
  //       culture: this.state.culture,
  //       outdoors: this.state.outdoors,
  //       history: this.state.history,
  //       shopping: this.state.shopping,
  //       wildlife: this.state.wildlife,
  //       beaches: this.state.beaches,
  //       mountain: this.state.mountain,
  //       Museum: this.state.museum,
  //       Amusement: this.state.amusement,
  //       hidden_paradise: this.state.hidden_paradise
  //     ],
  //     opening_hours: [
  //     [
  //       open: this.state.open1,
  //       time: [
  //         open: parseInt(this.state.opent1,
  //         close: parseInt(this.state.closet1
  //       ]
  //     ],
  //     [
  //       open: this.state.open2,
  //       time: [
  //         open: parseInt(this.state.opent2,
  //         close: parseInt(this.state.closet2
  //       ]
  //     ],
  //     [
  //       open: this.state.open3,
  //       time: [
  //         open: parseInt(this.state.opent3,
  //         close: parseInt(this.state.closet3
  //     ]
  //     ],
  //     [
  //       open: this.state.open4,
  //       time: [
  //         open: parseInt(this.state.opent4,
  //         close: parseInt(this.state.closet4
  //     ]
  //     ],
  //     [
  //       open: this.state.open5,
  //       time: [
  //         open: parseInt(this.state.opent5,
  //         close: parseInt(this.state.closet5
  //     ]
  //     ],
  //     [
  //       open: this.state.open6,
  //       time: [
  //         open: parseInt(this.state.opent6,
  //         close: parseInt(this.state.closet6
  //     ]
  //     ],
  //     [
  //       open: this.state.open7,
  //       time: [
  //         open: parseInt(this.state.opent7,
  //         close: parseInt(this.state.closet7
  //     ]
  //     ]
  //   ]
  //   ]
  // });






  post(){

    var jsonBod = JSON.stringify(
      {
        name: this.state.name,
        website: this.state.website,
        phone_number: this.state.phone,
        recommended_duration: parseInt(this.state.rec_dur),
        price: parseInt(this.state.price),
        route: this.state.route,
        location_id: this.state.loc_id,
        description: this.state.desc,
        coordinate: {
          latitude: this.state.coor_la,
          longtitude: this.state.coor_lo
        },
        tags: {
          culture: this.state.culture,
          outdoors: this.state.outdoors,
          history: this.state.history,
          shopping: this.state.shopping,
          wildlife: this.state.wildlife,
          beaches: this.state.beaches,
          mountain: this.state.mountain,
          Museum: this.state.museum,
          Amusement: this.state.amusement,
          hidden_paradise: this.state.hidden_paradise
        },
        opening_hours: [
        {
          open: this.state.open1,
          time: {
            open: this.state.opent1*60,
            close: this.state.closet1*60
          }
        },
        {
          open: this.state.open2,
          time: {
            open: this.state.opent2*60,
            close: this.state.closet2*60
          }
        },
        {
          open: this.state.open3,
          time: {
            open: this.state.opent3*60,
            close: this.state.closet3*60
        }
        },
        {
          open: this.state.open4,
          time: {
            open: this.state.opent4*60,
            close: this.state.closet4*60
        }
        },
        {
          open: this.state.open5,
          time: {
            open: this.state.opent5*60,
            close: this.state.closet5*60
        }
        },
        {
          open: this.state.open6,
          time: {
            open: this.state.opent6*60,
            close: this.state.closet6*60
        }
        },
        {
          open: this.state.open7,
          time: {
            open: this.state.opent7*60,
            close: this.state.closet7*60
        }
        }
      ]
      }
    );
    if(((this.state.opent1>=0&&this.state.opent1<=23)||this.state.opent1==null||this.state.opent1=='')
    &&((this.state.opent2>=0&&this.state.opent2<=23)||this.state.opent2==null||this.state.opent2=='')
    &&((this.state.opent3>=0&&this.state.opent3<=23)||this.state.opent3==null||this.state.opent3=='')
    &&((this.state.opent4>=0&&this.state.opent4<=23)||this.state.opent4==null||this.state.opent4=='')
    &&((this.state.opent5>=0&&this.state.opent5<=23)||this.state.opent5==null||this.state.opent5=='')
    &&((this.state.opent6>=0&&this.state.opent6<=23)||this.state.opent6==null||this.state.opent6=='')
    &&((this.state.opent7>=0&&this.state.opent7<=23)||this.state.opent7==null||this.state.opent7=='')
    &&((this.state.closet1>=0&&this.state.closet1<=23)||this.state.closet1==null||this.state.closet1=='')
    &&((this.state.closet2>=0&&this.state.closet2<=23)||this.state.closet2==null||this.state.closet2=='')
    &&((this.state.closet3>=0&&this.state.closet3<=23)||this.state.closet3==null||this.state.closet3=='')
    &&((this.state.closet4>=0&&this.state.closet4<=23)||this.state.closet4==null||this.state.closet4=='')
    &&((this.state.closet5>=0&&this.state.closet5<=23)||this.state.closet5==null||this.state.closet5=='')
    &&((this.state.closet6>=0&&this.state.closet6<=23)||this.state.closet6==null||this.state.closet6=='')
    &&((this.state.closet7>=0&&this.state.closet7<=23)||this.state.closet7==null||this.state.closet7=='')
){
    fetch('http://api.generatorwisata.com/api/attraction', {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'Content-Type: application/json',
        'Authentication': 'WshVVPQWJjdjOZckJvsdOiVGwp3KkMNQvPNCjXehlMVEt4s7EYN3lvybTs8TWwPPZvwLvensenLo6cOHVR01inbulpZgXcaQCwpenKU6CgVW53YiZt34mdBY'
      },
      body: jsonBod,
    }).then((response) => response.text())
      .then((responseText) => {
        if(JSON.parse(responseText).hasOwnProperty('id')){
          console.log(JSON.parse(responseText).id);
          console.log('suck ses')
          this.props.navigation.navigate('AddPhoto', {
               id: JSON.parse(responseText).id,
             });
        }else{
          Alert.alert(
            'Alert',
            `Something went wrong, couldn't add attraction! make sure you have filled all the forms correctly!
`+responseText,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }


         console.log(responseText);


         //this.setState({data: '',status: responseText});
      }).catch((error) => {
      console.error(error);
      Alert.alert(
  'Alert',
  `Something went wrong, couldn't add attraction!`,
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
    });
  }else{
    Alert.alert(
      'Alert',
      `Something went wrong, please only input number in 0-23 range`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
    //console.log(jsonBod)
  }

  componentDidMount(){
  return fetch('http://api.generatorwisata.com/api/locations')
    .then((response) => response.json())
    .then((responseJson) => {

      // this.setState({
      //   isLoading: false,
      //   dataSource: responseJson.movies,
      // }, function(){
      //
      // });

      var loc;
      var i = 0;
      for (var key in responseJson) {
        var keyz = responseJson[i].id;
        Object.assign(this.state.locitem, {[keyz]: responseJson[i].city});
        if(i==0){
          this.setState({selected: responseJson[i].city,loc_id: keyz})

        }
        i++;

      }
      this.setState({
        isLoading: false,
      })
      console.log("typeof: "+typeof responseJson[1].city)
      console.log(this.state.selected)
      console.log(this.state.locitem)
      console.log(responseJson)
    })
    .catch((error) =>{
      console.error(error);
    });
}

  render() {

    var empty = <View></View>;
    var open1b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent1: value})}
      placeholder="Open time"
      value={this.state.opent1}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet1: value})}
      placeholder="Close time"
      value={this.state.closet1}
      maxLength={2}
    />
    </View>;
    var open2b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent2: value})}
      placeholder="Open time"
      value={this.state.opent2}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet2: value})}
      placeholder="Close time"
      value={this.state.closet2}
      maxLength={2}
    />
    </View>;
    var open3b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent3: value})}
      placeholder="Open time"
      value={this.state.opent3}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet3: value})}
      placeholder="Close time"
      value={this.state.closet3}
      maxLength={2}
    />
    </View>;
    var open4b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent4: value})}
      placeholder="Open time"
      value={this.state.opent4}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet4: value})}
      placeholder="Close time"
      value={this.state.closet4}
      maxLength={2}
    />
    </View>;
    // var open4b = <View>
    // <Text>Open Time</Text>
    // <TextInput
    //   style={styles.inputtext}
    //   onChangeText={(value) => this.setState({opent4: value})}
    //   placeholder="Open time"
    //   value={this.state.opent4}
    //   maxLength={2}
    // />
    // <Text>Close Time</Text>
    // <TextInput
    //   style={styles.inputtext}
    //   onChangeText={(value) => this.setState({closet4: value})}
    //   placeholder="Close time"
    //   value={this.state.closet4}
    //   maxLength={2}
    // />
    // </View>;
    var open5b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent5: value})}
      placeholder="Open time"
      value={this.state.opent5}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet5: value})}
      placeholder="Close time"
      value={this.state.closet5}
      maxLength={2}
    />
    </View>;
    var open6b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent6: value})}
      placeholder="Open time"
      value={this.state.opent6}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet6: value})}
      placeholder="Close time"
      value={this.state.closet6}
      maxLength={2}
    />
    </View>;
    var open7b = <View>
    <Text>Open Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({opent7: value})}
      placeholder="Open time"
      value={this.state.opent7}
      maxLength={2}
    />
    <Text>Close Time</Text>
    <TextInput
      style={styles.inputtext}
      onChangeText={(value) => this.setState({closet7: value})}
      placeholder="Close time"
      value={this.state.closet7}
      maxLength={2}
    />
    </View>;


    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text>Name</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({name: value})}
            placeholder="Name"
            value={this.state.name}
          />
          <Text>Website</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({website: value})}
            placeholder="Website"
            value={this.state.website}
          />
          <Text>Phone</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({phone: value})}
            placeholder="Phone"
            value={this.state.phone}
          />
          <Text>Recommended Duration</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({rec_dur: value})}
            placeholder="Recommended Duration"
            value={this.state.rec_dur}
          />
          <Text>Price</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({price: value})}
            placeholder="Price"
            value={this.state.price}
          />
          <Text>Route</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({route: value})}
            placeholder="Route"
            value={this.state.route}
          />
          <Text>Location (city)</Text>
          <Picker
              mode="dropdown"
              selectedValue={this.state.selected}
              onValueChange={(itemValue, itemIndex) => this.setState({loc_id: itemValue, selected: itemValue})}>
              {Object.keys(this.state.locitem).map((key) => {
                  return (<Picker.Item label={this.state.locitem[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
              })}
          </Picker>
          <Text>Location Id</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({loc_id: value})}
            placeholder="Location Id"
            value={this.state.loc_id}
            editable={false} selectTextOnFocus={false}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({desc: value})}
            placeholder="Description"
            value={this.state.desc}
          />
          <Text>Coordinate Latitude</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({coor_la: value})}
            placeholder="Coordinate Latitude"
            value={this.state.coor_la}
          />
          <Text>Coordinate Longtitude</Text>
          <TextInput
            style={styles.inputtext}
            onChangeText={(value) => this.setState({coor_lo: value})}
            placeholder="Coordinate Longtitude"
            value={this.state.coor_lo}
          />
          <CheckBox
            title='Culture'
            checked={this.state.culture}
            onPress={(value) => this.setState({culture: !this.state.culture})}
          />
          <CheckBox
            title='Outdoors'
            checked={this.state.outdoors}
            onPress={(value) => this.setState({outdoors: !this.state.outdoors})}
          />
          <CheckBox
            title='History'
            checked={this.state.history}
            onPress={(value) => this.setState({history: !this.state.history})}
          />
          <CheckBox
            title='Shopping'
            checked={this.state.shopping}
            onPress={(value) => this.setState({shopping: !this.state.shopping})}
          />
          <CheckBox
            title='Wildlife'
            checked={this.state.wildlife}
            onPress={(value) => this.setState({wildlife: !this.state.wildlife})}
          />
          <CheckBox
            title='Beaches'
            checked={this.state.beaches}
            onPress={(value) => this.setState({beaches: !this.state.beaches})}
          />
          <CheckBox
            title='Mountain'
            checked={this.state.mountain}
            onPress={(value) => this.setState({mountain: !this.state.mountain})}
          />
          <CheckBox
            title='Museum'
            checked={this.state.museum}
            onPress={(value) => this.setState({museum: !this.state.museum})}
          />
          <CheckBox
            title='Amusement'
            checked={this.state.amusement}
            onPress={(value) => this.setState({amusement: !this.state.amusement})}
          />
          <CheckBox
            title='Hidden Paradise'
            checked={this.state.hidden_paradise}
            onPress={(value) => this.setState({hidden_paradise: !this.state.hidden_paradise})}
          />
          <Text style={styles.head}>Open Hours</Text>
          <CheckBox
            title='Senin'
            checked={this.state.open1}
            onPress={(value) => this.setState({open1: !this.state.open1})}
          />
          {this.state.open1 ? open1b : empty}
          <CheckBox
            title='Selasa'
            checked={this.state.open2}
            onPress={(value) => this.setState({open2: !this.state.open2})}
          />
          {this.state.open2 ? open2b : empty}
          <CheckBox
            title='Rabu'
            checked={this.state.open3}
            onPress={(value) => this.setState({open3: !this.state.open3})}
          />
          {this.state.open3 ? open3b : empty}
          <CheckBox
            title='Kamis'
            checked={this.state.open4}
            onPress={(value) => this.setState({open4: !this.state.open4})}
          />
          {this.state.open4 ? open4b : empty}
          <CheckBox
            title='Jumat'
            checked={this.state.open5}
            onPress={(value) => this.setState({open5: !this.state.open5})}
          />
          {this.state.open5 ? open5b : empty}
          <CheckBox
            title='Sabtu'
            checked={this.state.open6}
            onPress={(value) => this.setState({open6: !this.state.open6})}
          />
          {this.state.open6 ? open6b : empty}
          <CheckBox
            title='Minggu'
            checked={this.state.open7}
            onPress={(value) => this.setState({open7: !this.state.open7})}
          />
          {this.state.open7 ? open7b : empty}
          <Button
            onPress={this.post}
            title="SUBMIT"
            color='#27ae60'
          />
        </ScrollView>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Addz: Addz,
    AddPhoto: AddPhoto,
    UpdateAttr: UpdateAttr,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#27ae60',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingBottom: 30,
    //textAlign: 'left'
  },
  inputtext: {
    width: '100%'
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  contentContainer: {
    padding: 20,
  },
  buttona: {
    color: '#27ae60',
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
