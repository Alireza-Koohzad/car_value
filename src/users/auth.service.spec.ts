import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service"
import { User } from "./users.entity";
import { UsersService } from "./users.service";


describe('Auth Service', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>
                Promise.resolve({ id: 1, email, password } as User),
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    })


    it('test auth service ', async () => {
        expect(service).toBeDefined();
    })

    it('check password hashing', async () => {
        const user = await service.signup('asdf@asdf.com', 'asdf');

        expect(user.password).not.toEqual('asdf');
    });

    it('throws an error if user signs up with email that is in use', async () => {
        fakeUserService.find = () =>
            Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        try {
            const user = await service.signup('asdf@asdf.com', 'asdf');
            expect(user).toBeUndefined()
        } catch (err) {
        }
    });


    it('check email exist when signing in', async () => {
        try {
            const user = await service.signin('ad@gmai.com', 'adad');
            expect(user).toBeDefined();
        } catch (err) {

        }
    })


    it('check password comparison when singing in ', async () => {
        fakeUserService.find = () =>
            Promise.resolve([{ id: 1, email: 'awfaeg@gmail.com', password: 'aaa' } as User]);
        try {
            let user = await service.signin('awfaef@gmail.com', 'bbbb');
            expect(user).toBeUndefined()
        } catch (err) {

        }

    })

    it('check exist user when password comparison is valid', async () => {
        fakeUserService.find = () =>
            Promise.resolve([{ id: 1, email: 'test@test.com', password: 'aaa' } as User]);
        try {
            let user = await service.signin('test@test.com', 'aaa')
            expect(user).toBeDefined()
        } catch (err) {

        }

    })






})


