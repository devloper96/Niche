from parse_rest.connection import register
<<<<<<< HEAD
def initParse(sessionToken=None):
	print "init"
	if sessionToken == None:
		register('Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4','nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO',master_key=None)
	else:
		register('Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4','nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO',session_token=sessionToken)
=======
def initParse():
	print "init"
	register('Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4','nJOJNtVr1EvNiyjo6F6M8zfiUdzv8lPx31FBHiwO',master_key=None)
>>>>>>> 8b54aed287a64a211c755a3970c4d93efd468231
