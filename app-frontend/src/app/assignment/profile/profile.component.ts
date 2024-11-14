import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user = {
    photo: '',
    name: '',
    bio: '',
    phone: '',
    email: '',
    password: '',
  };
  isEditing = false;
  defaultPhotoUrl = 'assets/default-profile.png';

  constructor(private userService: UserService) {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserData().subscribe({
      next: (response) => {
        console.log(response);
        this.user.email = response['data']['emailAddress'];
        this.user.photo = response['data']['photoUrl'];
        this.user.name = response['data']['name'];
        this.user.bio = response['data']['bio'];
        this.user.phone = response['data']['mobileNumber'];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserData();
    }
  }

  onSave() {
    const updateData = {
      name: this.user.name,
      bio: this.user.bio,
      password: this.user.password,
      photoUrl: this.user.photo,
      mobileNumber: this.user.phone,
    };

    this.userService.updateUserData(updateData).subscribe({
      next: (_response) => {
        this.isEditing = !this.isEditing;
        this.loadUserData();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  onSignOut() {}
}
