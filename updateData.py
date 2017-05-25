from urllib2 import urlopen
import contextlib, json, urllib

# Takes Integer Value representing a subject and returns the course data encoded in a JSON string
def getSubjectJSON(sub):
    print "test"
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



# Iterates over every subject number from 0 to 999
for sub in range(0,999):

    print sub

    # Gets JSON for current subject
    allCourses = getSubjectJSON(sub)

    # Skips subject if no json is returned
    if allCourses is None:
        continue

	# Begins iteration over every course that was in the course json Array.
	for course in allCourses:

		print "\tCourse: %s" % course

		# Gets the array of sections for the current course.
		allSections = course['sections']

		# Exits the course loop in case the course for some reason contains no sections.
		if allSections is None:
			break

		# Begin iteration over every section in the section json Array.
		for section in allSections:

            # Gets the unique index for the current subject
			INDEX = section['index']

			# Gets the array of Meeting Times for the current section.
			meetingTimes = section['meetingTimes']

			# Begins iteration over every Meeting Time that was in the meetingTimes json Array.
			for time in meetingTimes:

				# Because Rutgers stores it's meeting times in the 12 hours AM PM format,
				# the following If Else statement converts all meetingTimes to the 24 hour
				# military format to make time representation simpiler

				# Makes sure that the meetingTime has a stored time, so meetingTimes are
				# listed with empty times.
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

                print "%d:%s:%s From %s to %s on %s" % (sub, course['courseNumber'], section['number'], START_TIME, END_TIME, time['meetingDay'])

			# print "\t\tSection: %s" % INDEX

			#print course['subject'] + ':' + currentSection.course_number + ':' + currentSection.number + ' Index #' + str(INDEX) + " is now: " + ('open' if isOpen else 'closed')

print "Update Succesful!"
