from django.shortcuts import render

nicknames = {
    'livingston' : 'Livingston',
    'livi' : 'Livingston',
    'busch' : 'Busch',
    'college_avenue' : 'College-Avenue',
    'college_ave' : 'College-Avenue',
    'cook' : 'Cook-Douglass',
    'douglass' : 'Cook-Douglass',
    'cook_douglass' : 'Cook-Douglass',
}

def index(request):
    return render(request, 'website/home.html', context={'nbar' : 'home'})

def campus(request, **kwargs):

    camp = nicknames.get(kwargs.get('name', None), 'Rutger')

    return render(request, 'website/campus.html', context={'nbar' : camp, 'campus_name' : camp})
