import { JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenStorage } from 'app/auth/token-storage';

export function jwtOptionsFactory(tokenStorage: TokenStorage) {
  return {
    tokenGetter: () => {
      return tokenStorage.getToken();
    }
  };
}

export const jwtConfig: JwtModuleOptions = {
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [TokenStorage]
    }
  };
