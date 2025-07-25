# Generated by Django 5.1.1 on 2025-05-11 17:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LMS', '0009_alter_enrollment_status'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='courseoffering',
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name='courseoffering',
            name='course',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='LMS.course'),
        ),
    ]
