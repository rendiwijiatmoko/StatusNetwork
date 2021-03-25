const { assert } = require('chai');

const StatusNetwork = artifacts.require("StatusNetwork");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('StatusNetwork', ([depployer, author, tipper]) => {
    let statusNetwork

    before(async () => {
        statusNetwork = await StatusNetwork.deployed()
    })

    describe('deployment', () => {
        it('deploys sucsessfully', async () => {
            const address = await statusNetwork.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        }),
        it('has a name', async () => {
            const name = await statusNetwork.name()
            assert.equal(name, "Rendi Wijiatmoko")
        })
    })

    describe('post', async () => {
        let result, postCount

        before(async () => {
            result = await statusNetwork.createPost("Ini adalah post pertama", {from: author})
            postCount = await statusNetwork.postCount()
        })

        it('create post', async () => {
            const event = result.logs[0].args

            assert.equal(postCount, 1)
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content,"Ini adalah post pertama", "content is correct")
            assert.equal(event.author, author, "Author is correct")
            assert.equal(event.tipAmount, "0", "Amount is correct")

            await statusNetwork.createPost("", {from:author}).should.be.rejected;
        })
        it('list posts', async () => {
            const post = await statusNetwork.posts(postCount)
            
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.content,"Ini adalah post pertama", "content is correct")
            assert.equal(post.author, author, "Author is correct")
            assert.equal(post.tipAmount, "0", "Amount is correct")
        })
        it('allows users to tip posts', async () => {
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await statusNetwork.tipPost(postCount, {from:tipper, value:web3.utils.toWei('1', 'Ether')});
            const event = result.logs[0].args

            assert.equal(postCount, 1)
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content,"Ini adalah post pertama", "content is correct")
            assert.equal(event.author, author, "Author is correct")
            assert.equal(event.tipAmount, "1000000000000000000", "Amount is correct")

            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('1', 'Ether')
            tipAmount = new web3.utils.BN(tipAmount)
            
            const expectedBalance = oldAuthorBalance.add(tipAmount)

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString())
        })
    })
})