I have copied the nodejs folder(that contains the executable here), all you have to do is run the starServer.bat, and then localhost:8080 should work.

You can take of the disabled attribute from the original input string word, and enter whatever you like as a default word.

I have used phantomjs and qunit for unit testing, you can find the test inside the phantomjs file:
	- phantom-qunit, is a specialized module that loads a html test file, and runs it with phantom
	- vendor/qunit, is the qunit's javascript file.
	- qTest.js, is my test, and as you can see i can run it with phantomjs (in startServer.bat) with :
			phantomjs phantomjs/phantom-qunit.js phantomjs/qunitTest.html  (the first file is has the phantomjs directives, and the second file represents the argument used by the first file)
