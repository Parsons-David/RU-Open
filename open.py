
import remi.gui as gui
from remi.gui import *
from remi import start, App
import smtplib


class untitled(App):
    def __init__(self, *args, **kwargs):
        if not 'editing_mode' in kwargs.keys():
            super(untitled, self).__init__(*args, static_file_path='./res/')

    def idle(self):
        #idle function called every update cycle
        pass

    def main(self):
        return untitled.construct_ui(self)

    @staticmethod
    def construct_ui(self):
        contOpen = Widget()
        contOpen.attributes['editor_newclass'] = "False"
        contOpen.attributes['editor_baseclass'] = "Widget"
        contOpen.attributes['editor_constructor'] = "()"
        contOpen.attributes['class'] = "Widget"
        contOpen.attributes['editor_tag_type'] = "widget"
        contOpen.attributes['editor_varname'] = "contOpen"
        contOpen.style['top'] = "38px"
        contOpen.style['height'] = "427px"
        contOpen.style['width'] = "785px"
        contOpen.style['position'] = "absolute"
        contOpen.style['overflow'] = "auto"
        contOpen.style['margin'] = "0px"
        contOpen.style['display'] = "block"
        contOpen.style['left'] = "33px"
        txtPhoneNumber = TextInput(False,'856-867-5309')
        txtPhoneNumber.attributes['editor_newclass'] = "False"
        txtPhoneNumber.attributes['editor_baseclass'] = "TextInput"
        txtPhoneNumber.attributes['editor_constructor'] = "(False,'856-867-5309')"
        txtPhoneNumber.attributes['class'] = "TextInput"
        txtPhoneNumber.attributes['autocomplete'] = "off"
        txtPhoneNumber.attributes['editor_tag_type'] = "widget"
        txtPhoneNumber.attributes['editor_varname'] = "txtPhoneNumber"
        txtPhoneNumber.attributes['placeholder'] = "856-867-5309"
        txtPhoneNumber.style['top'] = "59px"
        txtPhoneNumber.style['height'] = "30px"
        txtPhoneNumber.style['width'] = "100px"
        txtPhoneNumber.style['position'] = "absolute"
        txtPhoneNumber.style['overflow'] = "auto"
        txtPhoneNumber.style['margin'] = "0px"
        txtPhoneNumber.style['display'] = "block"
        txtPhoneNumber.style['left'] = "48px"
        contOpen.append(txtPhoneNumber,'txtPhoneNumber')
        dropCampus = DropDown()
        dropCampus.attributes['editor_newclass'] = "False"
        dropCampus.attributes['editor_baseclass'] = "DropDown"
        dropCampus.attributes['editor_constructor'] = "()"
        dropCampus.attributes['class'] = "DropDown"
        dropCampus.attributes['editor_tag_type'] = "widget"
        dropCampus.attributes['editor_varname'] = "dropCampus"
        dropCampus.style['top'] = "22px"
        dropCampus.style['height'] = "30px"
        dropCampus.style['width'] = "100px"
        dropCampus.style['position'] = "absolute"
        dropCampus.style['overflow'] = "auto"
        dropCampus.style['margin'] = "0px"
        dropCampus.style['display'] = "block"
        dropCampus.style['left'] = "47px"
        dropCampus.append(item = "198")
        dropCampus.append(item = "189")
        dropCampus.append(item = "640")
        contOpen.append(dropCampus,'dropCampus')
        btnLookUp = Button('Look Up')
        btnLookUp.attributes['editor_newclass'] = "False"
        btnLookUp.attributes['editor_baseclass'] = "Button"
        btnLookUp.attributes['editor_constructor'] = "('Look Up')"
        btnLookUp.attributes['class'] = "Button"
        btnLookUp.attributes['editor_tag_type'] = "widget"
        btnLookUp.attributes['editor_varname'] = "btnLookUp"
        btnLookUp.style['top'] = "91px"
        btnLookUp.style['height'] = "30px"
        btnLookUp.style['width'] = "100px"
        btnLookUp.style['position'] = "absolute"
        btnLookUp.style['overflow'] = "auto"
        btnLookUp.style['margin'] = "0px"
        btnLookUp.style['display'] = "block"
        btnLookUp.style['left'] = "44px"
        btnLookUp.set_on_click_listener(self, self.on_button_pressed)
        contOpen.append(btnLookUp,'btnLookUp')


        self.contOpen = contOpen
        return self.contOpen

    def on_button_pressed(self, widget):
        sub = self.dropCampus.get_value()
        sendText(sub)

    def sendText(body):
        fromaddr = 'Parsons Server'
    	toaddrs  = '6096612345@vtext.com'
    	msg = "\r\n".join([
    	  "From: Parsons Server",
    	  "To: 6096612345@vtext.com",
    	  "Register Here:",
    	  "",
    	  body
    	  ])
    	username = 'parsonsspyfall@gmail.com'
    	password = 'spyfallapptest@RU2016'
    	server = smtplib.SMTP('smtp.gmail.com:587')
    	server.ehlo()
    	server.starttls()
    	server.login(username,password)
    	server.sendmail(fromaddr, toaddrs, msg)
    	server.quit()
        print body

#Configuration
configuration = {'config_multiple_instance': True, 'config_address': '0.0.0.0', 'config_start_browser': True, 'config_enable_file_cache': True, 'config_project_name': 'untitled', 'config_resourcepath': './res/', 'config_port': 8081}

if __name__ == "__main__":
    # start(MyApp,address='127.0.0.1', port=8081, multiple_instance=False,enable_file_cache=True, update_interval=0.1, start_browser=True)
    start(untitled, address=configuration['config_address'], port=configuration['config_port'],
                        multiple_instance=configuration['config_multiple_instance'],
                        enable_file_cache=configuration['config_enable_file_cache'],
                        start_browser=configuration['config_start_browser'])
