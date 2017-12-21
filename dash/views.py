from django.shortcuts import render
from django.utils import timezone
from .models import Task
from .forms import TaskForm
from django.shortcuts import redirect
from django.http import *
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def index(request):
    if request.method == "POST":
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.author = request.user
            task.created_date = timezone.now()
            task.save()
    else:
        form = TaskForm()

    tasks = Task.objects.all()
    return render(request, 'home.html', {'tasks': tasks, 'form': form})
