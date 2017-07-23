from django.shortcuts import render

def index(request):
    return render(request, 'website/home.html', context={'nbar' : 'home'})

def livingston(request):
    return render(request, 'website/livingston.html', context={'nbar' : 'livingston'})

def busch(request):
    return render(request, 'website/busch.html', context={'nbar' : 'busch'})

def college_avenue(request):
    return render(request, 'website/college_avenue.html', context={'nbar' : 'college_avenue'})

def cook_douglass(request):
    return render(request, 'website/cook_douglass.html', context={'nbar' : 'cook_douglass'})