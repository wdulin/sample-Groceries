# To Do List


## Next

1. Order grocery list from newest to lowest
2. Error: Logout creates firebase.database error
3. Label truncation is too short in listview.
4. 


# Feature Tests

### Original Features 

1. Login with pre-created account
2. Account specific grocery items are listed in main listview
3. Adding an item results in a permanent addition to user's grocery items
4. Clicking delete moves item to <Recent> list
5. Clicking item in <Recent> list moves item to <Main Grocery List>
6. Logout returns to <Login Screen> without error.

### New Features in Advanced Grocery Example

1. Telerik RadListView allows ordering list
2. Sign In using social networks
3. Online/Offline Indicator and Button
4. Permanent Delete button on <Recent> list
5. Add picture to grocery items using Firebase storage
6. Edit saved item


## Additional Ideas

1. Framework for abstracting Realtime Offline First Backends 



## Troubleshooting:


Logging Off raises the following error in Android Emulator:

com.tns.NativeScriptException: 
Calling js method onCancelled failed

Error: java.lang.AbstractMethodError: abstract method "void com.google.firebase.database.ChildEventListener.onCancelled(com.google.firebase.database.DatabaseError)"
    com.tns.Runtime.callJSMethodNative(Native Method)
    com.tns.Runtime.dispatchCallJSMethodNative(Runtime.java:862)
    com.tns.Runtime.callJSMethodImpl(Runtime.java:727)
    com.tns.Runtime.callJSMethod(Runtime.java:713)
    com.tns.Runtime.callJSMethod(Runtime.java:694)
    com.tns.Runtime.callJSMethod(Runtime.java:684)
    com.tns.gen.com.google.firebase.database.ChildEventListener.onCancelled(ChildEventListener.java:38)
    com.google.android.gms.internal.zzahe.zza(Unknown Source)
    com.google.android.gms.internal.zzajc.zzcta(Unknown Source)
    com.google.android.gms.internal.zzajh$1.run(Unknown Source)
    android.os.Handler.handleCallback(Handler.java:739)
    android.os.Handler.dispatchMessage(Handler.java:95)
    android.os.Looper.loop(Looper.java:135)
    android

## Child Changed Event

{"type":"ChildAdded","key":"-KS1l7Inwa1RVCXpWTq6","value":{"name":"Milk","done":false,"deleted":false,"dateCreated":1474293957917,"key":""}}
{"type":"ChildAdded","key":"-KS1lHvxF6DYqmkS3WEj","value":{"name":"Potatoes","done":false,"deleted":false,"dateCreated":1474294001448,"key":""}}
{"type":"ChildAdded","key":"-KS1nJTJguLu4M55qBrw","value":{"name":"Butter","done":false,"deleted":false,"dateCreated":1474294532036,"key":""}}
{"type":"ChildAdded","key":"-KS1tMHiJwlrLjuP5cq0","value":{"name":"Ketchup","done":false,"deleted":false,"dateCreated":1474296116485,"key":""}}
{"type":"ChildChanged","key":"-KS1l7Inwa1RVCXpWTq6","value":{"done":true,"deleted":false}}
{"type":"ChildChanged","key":"-KS1l7Inwa1RVCXpWTq6","value":{"done":false,"deleted":true}}
{"type":"ChildRemoved","key":"-KS1l7Inwa1RVCXpWTq6","value":{"done":false,"deleted":true}}