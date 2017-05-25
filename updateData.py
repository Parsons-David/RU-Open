from urllib2 import urlopen
import contextlib, json, urllib, logging
import threading

# Takes Integer Value representing a subject and returns the course data encoded in a JSON string
def getSubjectJSON(sub):
    if sub < 10 :
	    strSub = '00' + str(sub)
    elif sub < 100 :
	    strSub = '0' + str(sub)
    else :
	    strSub = str(sub)
    url = 'http://sis.rutgers.edu/soc/courses.json?subject=' + strSub + '&semester=12017&campus=NB&level=U'
    output = None
	# Pulls the json associated with the current subject from the Rutgers Server.
    with contextlib.closing(urllib.urlopen(url)) as response:
	    output = json.load(response)
    return output

def getCourseTimes(course):
    # logging.info('\t' + course["courseNumber"])
    for sec in course["sections"]:
        getSectionTimes(sec)

def getSectionTimes(section):
    # logging.info('\t\t' + section["index"])
    for time in section["meetingTimes"]:
        getMeetingTimes(time)

def getMeetingTimes(time):
    if(time['startTime'] != None):
    	# Determines the whether the meeting times are AM or PM
    	if(time['pmCode'] == 'P'):
    		# If PM, all times under 1200 are increased by 1200, so 12:00 PM becomes
    		# 1200 and 3:00 PM becomes 1500
    		START_TIME = str(int(time['startTime']) + 1200)  if (int(time['startTime']) < 1200) else time['startTime']
    		END_TIME = str(int(time['endTime']) + 1200) if (int(time['endTime']) < 1200) else time['endTime']
    	else:
    		# If AM, the start time is imported without modification, but the if the endTime
    		# is less than the start time, the end time is increased by 1200. So if a course
    		# is listed as AM, but it ends in the PM, the 24 hr time format is still preserved.
    		# For example is a course starts at 11:30 AM, but ends at 1:30 PM, then 0130, must
    		# be converted to 1330
    		START_TIME = time['startTime']
    		END_TIME = (int(time['endTime']) + 1200) if (int(time['endTime']) < int(time['startTime'])) else time['endTime']
    else:
    	# Ensures that null times are still imported
    	START_TIME = time['startTime']
    	END_TIME = time['endTime']

    if(not (START_TIME == None or END_TIME == None or time['meetingDay'] == None or time['campusName'] == None or time['buildingCode'] == None or time['roomNumber'] == None)):
        # logging.info("\tFrom %s to %s on %s. On %s in %s %s" % (START_TIME, END_TIME, time['meetingDay'], time['campusName'], time['buildingCode'], time['roomNumber']))
        log = ("\t Campus: %s Building: %s %s at %s for %s" % (time['campusName'], time['buildingCode'], time['roomNumber'], START_TIME, str(int(END_TIME) - int(START_TIME))))

        addTime(time['campusName'], time['buildingCode'], time['roomNumber'], time['meetingDay'], START_TIME, END_TIME)

        if(log not in uniqueLogs):
            uniqueLogs.append(log)
            logging.info(log)

def getSubjectTimes(sub):

    # logging.info(sub)

    # Gets JSON for current subject
    allCourses = getSubjectJSON(sub)

    # Skips subject if no json is returned
    if allCourses is None:
        return

    for course in allCourses:
        getCourseTimes(course)

def addTime(c, b, r, d, s, e):
    global data

    if(c not in data):
        print(len(data))
        data[c] = {}

    campus = data[c]

    if(b not in campus):
        campus[b] = {}

    build = campus[b]

    if(r not in build):
        build[r] = {}

    room = build[r]

    if(d not in room):
        room[d] = []

    day = room[d]

    time = {'str' : s, 'end' : e}

    if(time not in day):
        day.append(time)


# Start
data = {}
uniqueLogs = []
LOG_FILENAME = 'import.log'
logging.basicConfig(filename=LOG_FILENAME, level=logging.DEBUG, filemode='w')
# Iterates over every subject number from 0 to 999
for sub in range(0,999):

    getSubjectTimes(sub)

    # t = threading.Thread(target=getSubjectTimes, args=[sub])
    # t.start()

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)
