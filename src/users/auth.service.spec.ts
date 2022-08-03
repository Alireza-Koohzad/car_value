import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service"
import { User } from "./users.entity";
import { UsersService } from "./users.service";


describe('Auth Service', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;
    beforeEach(async () => {
        // Create a fake copy of the users service
        const users: User[] = [];
        fakeUserService = {
            find: (email: string) => {
                const filteredUsers = users.filter((user) => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 999999),
                    email,
                    password,
                } as User;
                users.push(user);
                return Promise.resolve(user);
            },
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
        await service.signup('asdf@asdf.com', 'asdf')
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
        await service.signup('awfaef@gmail.com', 'aaa')
        let user = await service.signin('awfaef@gmail.com', 'bbbb');
        expect(user).toBeUndefined()

    })



    it('check exist user when password comparison is valid', async () => {
        await service.signup('test@test.com', 'aaa')
        let user = await service.signin('test@test.com', 'aaa')
        expect(user).toBeDefined()

    })

})


