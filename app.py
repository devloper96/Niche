from parse_rest.user import User
import settings_local
from flask import Flask,request,redirect, url_for ,render_template,send_from_directory,session,make_response
from parse_rest.connection import SessionToken, register
from parse_rest.datatypes import Function
import json,httplib
import os
from flask.ext.triangle import Form,Triangle
from flask.ext.triangle.widgets.standard import TextInput

settings_local.initParse()
app = Flask(__name__,static_url_path='')
Triangle(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config['UPLOAD_FOLDER'] = os.path.join(APP_ROOT, '/uploads/')



@app.route('/',methods=['GET', 'POST'])
def index():
	settings_local.initParse()
	if request.method == 'POST' and request.form["what"]== 'Login':
		try:
			print request.form["password"]
			u = User.login(request.form["username"],request.form["password"])
			session['session_token'] = u.sessionToken
			resp = make_response(render_template("index.html"))
			return resp
		except:
			return render_template('login.html',error="Invalid username or password")
	elif request.method == 'POST' and request.form["what"]=='SignUp':
		email = request.form["email"]

		password = request.form["password"]

		ninja = request.form["ninja"]

		proPic = request.files["profilePic"]
		birthdate = request.form["birthdate"]
		print birthdate
		u = User.signup(email,password)
		u.email=email
		u.save()
		proPic.save(os.path.join(app.config['UPLOAD_FOLDER']),"userdp.png")
		connection = httplib.HTTPSConnection('api.parse.com', 443)
		connection.connect()
		connection.request('POST', '/1/files/profilePic.png', open('userdp.png', 'rb').read(), {
		"X-Parse-Application-Id": "${Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4}",
		"X-Parse-REST-API-Key": "${nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO}",
		"Content-Type": "image/png"
		})
		result = json.loads(connection.getresponse().read())
		print result
		connection.request('POST', '/1/classes/_User', json.dumps({
		"username": email,
		"picture": {
		 "name": "profilePic.png",
		 "__type": "File"
		}
		}), {
		"X-Parse-Application-Id": "${Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4}",
		"X-Parse-REST-API-Key": "${nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO}",
		"Content-Type": "application/json"
		})
		result = json.loads(connection.getresponse().read())
		print result
		session['session_token'] = u.sessionToken
		resp = make_response(render_template("index.html"))
		return resp
	else:
		if session.get('session_token') is None:
			print "nohhh"
			return render_template('login.html')
		else:
			print "yes"
			return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
	print path
	return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
	print path
	return send_from_directory('css', path)

@app.route('/font/<path:path>')
def send_font(path):
	print path
	return send_from_directory('font', path)

@app.route('/images/<path:path>')
def send_images(path):
	print path
	return send_from_directory('images', path)

@app.route('/Icons/<path:path>')
def Icons(path):
	print path
	return send_from_directory('Icons', path)


@app.route('/logout')
def logout():
	session["session_token"]=None
	return redirect(url_for('index'))

def GetCurrentUser():
	token = session.get('session_token')
	settings_local.initParse(token)
	me = User.current_user()
	return me

@app.route('/GetSessionToken')
def GetSessionToken():
	token = session.get('session_token')
	return str(token)

@app.route('/GetUserInterests')
def GetUserInterests():
	d = []
	GetCurrentUser()
	user_interest_function = Function("GetUserIntrest")
	d = user_interest_function()
	return json.dumps(d)

@app.route('/Profile')
def Profile():
	return render_template('profile.html')

@app.route('/Settings')
def Settings():
	return render_template('Settings.html')

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.run(host="0.0.0.0",debug=True,port=5000)


# font images)


#font images
