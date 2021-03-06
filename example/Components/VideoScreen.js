/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { StyleSheet, Text, View, Button, Slider } from 'react-native'
import { VideoView } from 'react-native-gvr'

export default class VideoScreen extends React.Component {
  static navigationOptions = {
    title: 'VideoView'
  }

  state = {
    paused: true,
    displayMode: 'embedded',
    progress: 0
  }

  setRef = view => {
    this.videoView = view
  }

  togglePlay = () => {
    this.setState({ paused: !this.state.paused })
  }

  setDisplayMode = displayMode => {
    this.setState({ displayMode })
  }

  sliderValueChange = value => {
    this.videoView && this.videoView.seekTo(value)
  }

  onContentLoad = event => {
    console.log('Content load', event.nativeEvent)
  }

  onTap = () => {
    console.log('On tap')
    if (this.state.displayMode !== 'embedded') {
      this.setState({ paused: !this.state.paused })
    }
  }

  onUpdatePosition = event => {
    this.setState({ progress: event.nativeEvent.position })
  }

  onChangeDisplayMode = event => {
    console.log('On change display mode', event.nativeEvent)
    if (this.state.paused && event.nativeEvent.mode !== 'embedded') {
      this.setState({ paused: false })
    }
    this.setState({ displayMode: event.nativeEvent.mode })
  }

  render () {
    const { paused, displayMode, progress } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <VideoView
            style={styles.content}
            source={{
              uri: 'https://video-cdn.dn.se/M/V/o/e/oeaky5JMkZQx9KTZf4pcLQ_auto_hls.ssl.m3u8?v=2&token=01db2faeb4174b6fc86c4',
              type: 'stereo'
            }}
            ref={this.setRef}
            displayMode={displayMode}
            volume={1}
            paused={paused}
            enableTouchTracking
            enableFullscreenButton={displayMode !== 'embedded'}
            enableCardboardButton={displayMode !== 'embedded'}
            hidesTransitionView
            enableInfoButton={false}
            onContentLoad={this.onContentLoad}
            onTap={this.onTap}
            onUpdatePosition={this.onUpdatePosition}
            onChangeDisplayMode={this.onChangeDisplayMode}
          />
          <Button
            onPress={this.togglePlay}
            title={ paused ? 'Play' : 'Pause'} />
          <Button
            onPress={() => { this.setDisplayMode('fullscreen') }}
            title='Fullscreen' />
          <Button
            onPress={() => { this.setDisplayMode('cardboard') }}
            title='VR' />
          <Slider value={progress} maximumValue={1} minimumValue={0} onValueChange={this.sliderValueChange} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 10
  },
  content: {
    width: '100%',
    aspectRatio: 16 / 9,
  }
})
