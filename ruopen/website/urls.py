"""ruopen URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^livingston/$', views.livingston, name='livingston'),
    url(r'^livi/$', views.livingston, name='livingston'),
    url(r'^busch/$', views.busch, name='busch'),
    url(r'^college_avenue/$', views.college_avenue, name='college_avenue'),
    url(r'^college_ave/$', views.college_avenue, name='college_avenue'),
    url(r'^cook/$', views.cook_douglass, name='cook_douglass'),
    url(r'^douglass/$', views.cook_douglass, name='cook_douglass'),
    url(r'^cook_douglass/$', views.cook_douglass, name='cook_douglass'),
]
