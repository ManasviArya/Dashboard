import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../login/auth-guard.service';
import { AdminGuard } from '../login/admin-guard.service';
import { MyHomeComponent} from './myhome.component';
import { DashboardComponent} from '../dashboard/dashboard.component';
import { RegisterComponent} from '../user/register.component';
import { DeviceRegisterComponent} from '../device/deviceRegister.component';
import { DeviceEditComponent} from '../device/deviceEdit.component';
import { DeviceViewComponent} from '../device/deviceView.component';
import { DeviceListComponent} from '../device/deviceList.component';
import { UserListComponent} from '../user/userlist.component';
import { HistoryComponent } from '../history/history.component';
import { ProfileComponent } from '../user/editprofile.component';
import { ActivityComponent } from '../activity/activity.component';


const myHomeRoutes: Routes = [
  {
    path: 'user',
    component: MyHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'devices', 
            children:[
              { path: '', component: DeviceListComponent },
              { path:'history/:id', component: HistoryComponent },
              { path: 'adddevice', component: DeviceRegisterComponent, canActivate: [AdminGuard]  },
              { path: 'adddevice/view/:id', component: DeviceViewComponent  },
              { path: 'adddevice/edit/:id', component: DeviceEditComponent, canActivate: [AdminGuard]  }
            ]
          },
          { path: 'users', 
            children:[
              { path: '', component: UserListComponent, canActivate: [AdminGuard] },
              { path:'register', component: RegisterComponent, canActivate: [AdminGuard]  }
            ]
          },
          { path: 'history/:id', component: HistoryComponent  },
          { path: 'editprofile', component: ProfileComponent  },
          { path:'activity', component: ActivityComponent  },
          { path:'activity/:id', component: ActivityComponent  },          
          { path: '**', component: DashboardComponent }
        ],
      }
    ]
  }
];

// [{ path: 'user', component: MyHomeComponent,children: [
//           {
//             path: 'dashboard',
//             component: DashboardComponent
//           }
//         ]
//     }]


@NgModule({
  imports: [
    RouterModule.forChild(myHomeRoutes)
  ],
  exports: [RouterModule]
})
export class MyHomeRoutingModule { }