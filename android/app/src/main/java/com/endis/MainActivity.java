package com.endis;

import com.facebook.react.ReactActivity;
import android.content.Intent; // react-native-orientation
import android.content.res.Configuration; // react-native-orientation

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ENDIS";
    }

    // react-native-orientation
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
    // react-native-orientation
}
