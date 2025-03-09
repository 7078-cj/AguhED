import os
from celery import Celery
import multiprocessing

# Fix for Windows multiprocessing issues
if os.name == 'nt':
    multiprocessing.set_start_method('spawn', force=True)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
