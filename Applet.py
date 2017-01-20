import remi.gui as gui
from urllib2 import urlopen
import json
from remi import start, App

class Applet(App):
    def __init__(self, *args):
        super(Applet, self).__init__(*args)

    def main(self):
        container = gui.VBox(width = 1200, height = 1000)
        self.lbl = gui.Label('Hello world!')
        self.bt = gui.Button('Press me!')
        self.bt2 = gui.Button('Dont Press me!')

        # setting the listener for the onclick event of the button
        self.bt.set_on_click_listener(self.on_button_pressed)

        # appending a widget to another, the first argument is a string key
        container.append(self.lbl)
        container.append(self.bt)
        container.append(self.bt2)

        # returning the root widget
        return container

    # listener function
    def on_button_pressed(self, widget):
        url = 'http://sis.rutgers.edu/soc/courses.json?subject=198&semester=12017&campus=NB&level=U'
        response = urlopen(url)
        json_obj = json.load(response)
        response.close()
        self.lbl.set_text(json_obj)
        self.bt.set_text('Hi!')

start(Applet, username="admin", password="admin")
# start(Applet)
#start(Applet, address = '192.168.1.14', port = 80, multiple_instance=False, enable_file_cache=True, update_interval=0.1, start_browser=False)
