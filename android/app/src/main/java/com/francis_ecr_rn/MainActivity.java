package com.francis_ecr_rn;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Francis_ECR_RN";
  }

    @Override
      protected ReactActivityDelegate createReactActivityDelegate() {
      SplashScreen.show(this);
       return new ReactActivityDelegate(this, getMainComponentName()) {
         @Override
          protected ReactRootView createRootView() {
          return new RNGestureHandlerEnabledRootView(MainActivity.this);
          }
       };
     }
}
