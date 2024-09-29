import { TestBed } from '@angular/core/testing';
import { RemoteConfigService } from './remote-config.service';
import { RemoteConfig } from '@angular/fire/remote-config';
import { of } from 'rxjs';
import { fetchAndActivate, getStringChanges } from '@angular/fire/remote-config';

jest.mock('@angular/fire/remote-config');

describe('RemoteConfigService', () => {
  let service: RemoteConfigService;
  let remoteConfigMock: any;

  beforeEach(() => {
    remoteConfigMock = {
      settings: {
        minimumFetchIntervalMillis: 43200000,
      },
    };

    TestBed.configureTestingModule({
      providers: [RemoteConfigService, { provide: RemoteConfig, useValue: remoteConfigMock }],
    });

    service = TestBed.inject(RemoteConfigService);
  });

  it(`Given RemoteConfigService,
      When activateRemoteConfig is called,
      Then it should set minimumFetchIntervalMillis to 0 and call fetchAndActivate`, done => {
    // Arrange
    (fetchAndActivate as jest.Mock).mockReturnValue(of(true));

    // Act
    service.activateRemoteConfig().subscribe(result => {
      // Assert
      expect(remoteConfigMock.settings.minimumFetchIntervalMillis).toBe(0);
      expect(fetchAndActivate).toHaveBeenCalledWith(remoteConfigMock);
      expect(result).toBe(true);
      done();
    });
  });

  it(`Given a boolean value in RemoteConfig,
      When getBooleanValue$ is called,
      Then it should return true when value is 'true'`, done => {
    // Arrange
    (getStringChanges as jest.Mock).mockReturnValue(of('true'));

    // Act
    service.getBooleanValue$('someKey').subscribe(result => {
      // Assert
      expect(getStringChanges).toHaveBeenCalledWith(remoteConfigMock, 'someKey');
      expect(result).toBe(true);
      done();
    });
  });

  it(`Given a boolean value in RemoteConfig,
      When getBooleanValue$ is called,
      Then it should return false when value is not 'true'`, done => {
    // Arrange
    (getStringChanges as jest.Mock).mockReturnValue(of('false'));

    // Act
    service.getBooleanValue$('someKey').subscribe(result => {
      // Assert
      expect(getStringChanges).toHaveBeenCalledWith(remoteConfigMock, 'someKey');
      expect(result).toBe(false);
      done();
    });
  });
});
